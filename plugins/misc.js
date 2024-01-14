const { 
    Module, 
    styletext, 
    listall, 
    tiny, 
    isPublic,
    runtime 
} = require("../lib/");
const { FancyRandom } = require('abu-bot');


Module(
  {
    pattern: "ping",
    fromMe: isPublic,
    desc: "response speed.",
    type: "info",
  },
  async (message, match) => {
    const start = new Date().getTime();
    const botz = await FancyRandom("*Testing Bot Speed*")
    await message.reply(botz);
    const end = new Date().getTime();    
const Jsl1 = await FancyRandom("*︎︎⟪ Response in " + (end - start) + " ms︎ec ⟫*")
    return await message.reply(Jsl1);
  }
);

Module({
  pattern: 'runtime',
  fromMe: isPublic,
  type: 'info',
  desc: 'shows bot running time'
}, (async (message, match) => {
return await message.reply(Jl1);
}));


Module(
  {
    pattern: "readmore ?(.*)",
    fromMe: isPublic,
    desc: "Readmore generator",
    type: "whatsapp",
  },
  async (message, match) => {
    await message.reply(match.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
  }
);

Module(
  {
    pattern: "wame ?(.*)",
    fromMe: isPublic,
    desc: "wame generator",
    type: "whatsapp",
  },
  async (message, match) => {
    let jsl = 'https://wa.me/' + (message.reply_message.jid || message.mention[0] || match).split('@')[0];
    await message.reply(jsl)
  }
);


Module({
         pattern: 'getjids ?(.*)', 
         desc: 'get all groups\' jids',
         type: 'whatsapp',
         fromMe: true
}, async (msg, query) => {

    var groups = Object.keys(await msg.client.groupFetchAllParticipating())

    if (!groups.length) return await msg.reply("_No group chats!_");

    var _msg = "";

    for (let e of groups){

        try {

    var g_name = (await msg.client.groupMetadata(e)).subject

    } catch {var g_name = 'Can\'t load name (rate-overlimit)'}

    _msg+= `_Group:_ ${g_name} \n_JID:_ ${e}\n\n`

    }

    await msg.reply(_msg)

});
