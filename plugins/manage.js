const simpleGit = require('simple-git');
const git = simpleGit();
const { Module, sendButton } = require('../lib');
const config = require('../config');
const { SUDO, MODE } = require('../config');
const Config = require('../config');
const Heroku = require('heroku-client');
const { isAdmin, isUrl } = require("../lib/");
    const heroku = new Heroku({
        token: Config.HEROKU_API_KEY
    });
    
    var handler = Config.HANDLERS !== '^'?Config.HANDLERS.split("")[0]:""
        async function fixHerokuAppName(message = false){
            if (!HEROKU_API_KEY && message) return await message.reply(`_You have not provided HEROKU_API_KEY\n\nPlease fill this var, get api key from heroku account settings_`)
            let apps = await heroku.get('/apps')
            let app_names = apps.map(e=>e.name)
            if (!HEROKU.APP_NAME || !app_names.includes(Config.HEROKU_APP_NAME)){
            function findGreatestNumber(e){let t=e[0];for(let n=1;n<e.length;n++)e[n]>t&&(t=e[n]);return t}
            let times = apps.map(e=>new Date(e.updated_at).getTime())
            let latest = findGreatestNumber(times)
            let index = times.indexOf(latest)
            let app_name = apps[index].name
            Config.HEROKU_APP_NAME = app_name
            process.env.HEROKU_APP_NAME = app_name
            baseURI = '/apps/' + app_name;
            if (message) await message.reply(`_You provided an incorrect heroku app name, and I have corrected your app name to "${app_name}"_\n\n_Please retry this command after restart!_`)    
            Config.HEROKU_APP_NAME = app_name
                return await setVar("HEROKU_APP_NAME",app_name,message)
            }
        }
        async function setVar(key,value,message = false){
        key = key.toUpperCase().trim()
        value = value.trim()
        let setvarAction = isHeroku ? "restarting" : isVPS ? "rebooting" : "redeploying";
        var set_ = `_Successfully set ${key} to ${value}, {}.._`;
        set_ = key == "MODE" ? `Mode switched to ${value}, {}`:set_;
        set_ = set_.format(setvarAction)
        let m = message;
        if (isHeroku) {
            await fixHerokuAppName(message)
            await heroku.patch(baseURI + '/config-vars', {
                body: {
                    [key]: value
                }
            }).then(async (app) => {
                if (message){
                return await message.reply(set_)
                }
            });
        }
        }
        
        
Module(
  {
    pattern: 'restart',
    fromMe: true,
    desc: 'restart the bot',
    type: 'heroku',
  },
  async (message) => {
    await message.reply(`_Restarting_`)
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);})
  }
);

Module(
  {
    pattern: 'shutdown',
    fromMe: true,
    desc: 'shutdown the bot.',
    type: 'heroku',
  },
  async (message) => {
    await heroku.get(baseURI + '/formation').then(async (formation) => {
    await message.reply(`_Shuttind down._`)
    await heroku.patch(baseURI + '/formation/' + formation[0].id, { body: { quantity: 0 }, }) }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);})
  }
);

Module(
  {
    pattern: "setvar ?(.*)",
    fromMe: true,
    desc: "set heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.reply(`_Example: .setvar SUDO:917025994178_`);
    const [key, value] = match.split(":");
    if (!key || !value) return await message.reply(`_Example: .setvar SUDO:917025994178_`);
    heroku.patch(baseURI + "/config-vars", {
    body: { [key.toUpperCase()]: value },
    }).then(async () => {
    await message.reply(`_${key.toUpperCase()}: ${value}_`);
    }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "delvar ?(.*)",
    fromMe: true,
    desc: "delete heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.reply(`_Example: delvar sudo_`);
    heroku.get(baseURI + "/config-vars").then(async (vars) => {
    const key = match.trim().toUpperCase();
    if (vars[key]) { await heroku.patch(baseURI + "/config-vars", {
    body: { [key]: null },
    });
    return await message.reply(`_Deleted ${key}_`);
    }
    await message.reply(`_${key} not found_`);
    }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "getvar ?(.*)",
    fromMe: true,
    desc: "show heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.reply(`_Example: getvar sudo_`);
    const key = match.trim().toUpperCase();
    heroku.get(baseURI + "/config-vars").then(async (vars) => {
    if (vars[key]) {
    return await message.reply("_{} : {}_".replace("{}", key).replace("{}", vars[key]));
    }
    await message.reply(`${key} not found`);
    }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "allvar",
    fromMe: true,
    desc: "heroku all env",
    type: "heroku",
  },
  async (message) => {
    let msg = "```Here your all Heroku vars\n\n\n";
    heroku.get(baseURI + "/config-vars").then(async (keys) => {
    for (const key in keys) {
    msg += `${key} : ${keys[key]}\n\n`;
    }
    return await message.reply(msg + "```");
    }).catch(async (error) => {
    await message.reply(`HEROKU : ${error.body.message}`);
    });
  }
);

Module({
        pattern: 'language ?(.*)',
        fromMe: true,
        desc: "change bot language to en & ml",
        use: 'settings'
    }, (async (message, match) => {
        if (match[1]?.toLowerCase() == "public" || match[1]?.toLowerCase() == "private"){
            return await setVar("MODE",match[1],message)
        } else {
            return await message.reply(`_*Language manager*_\n_Current Language: ${config.LANGUAGE}_\n\n_Use setvar LANGUAGE: english/manglish_`)
        }
    }));
    

Module({
        pattern: 'mode ?(.*)',
        fromMe: true,
        desc: "change bot mode to public & private",
        use: 'settings'
    }, (async (message, match) => {
        if (match[1]?.toLowerCase() == "public" || match[1]?.toLowerCase() == "private"){
            return await setVar("MODE",match[1],message)
        } else {
            return await message.reply(`_*Mode manager*_\n_Current mode: ${config.MODE}_\n_Use setvar MODE: public/private_`)
        }
    }));
    

Module(
  {
    pattern: "setsudo ?(.*)",
    fromMe: true,
    desc: "add replied or mentioned or given num to sudo",
    type: "heroku",
  },
  async (message, match) => {
    var newSudo = (message.mention[0] || message.reply_message.jid || match).split("@")[0]
    if (!newSudo) return await message.reply("_Need number/reply/mention_");
    var setSudo = (SUDO+","+newSudo).replace(/,,/g,",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",","") : setSudo
    await message.reply('_New SUDO Numbers are: _'+setSudo)
    await heroku.patch(baseURI + '/config-vars', {body: {"SUDO": setSudo}}).then(async (app) => {});
  }
);

Module(
  {
    pattern: "delsudo ?(.*)",
    fromMe: true,
    desc: "remove replied or mentioned or given num to sudo",
    type: "heroku",
  },
  async (message, match) => {
    var newSudo = (message.mention[0] || message.reply_message.jid || match).split("@")[0]
    if (!newSudo) return await message.reply("_Need number/reply/mention_");
    var setSudo = SUDO.replace(newSudo,"").replace(/,,/g,",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",","") : setSudo
    await message.reply('```New SUDO Numbers are: ```'+setSudo)
    await heroku.patch(baseURI + '/config-vars', {body: { "SUDO": setSudo}}).then(async (app) => {});
  }
);

Module(
  {
    pattern: "getsudo ?(.*)",
    fromMe: true,
    desc: "shows sudo",
    type: "heroku",
  },
  async (message, match) => {
    const vars = await heroku.get(baseURI + '/config-vars').catch(async (error) => {
    return await message.reply('HEROKU : ' + error.body.message) })
    await message.reply('```' + `SUDO Numbers are : ${vars.SUDO}` + '```')
  }
);
