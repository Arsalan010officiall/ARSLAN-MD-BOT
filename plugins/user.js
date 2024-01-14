const {
    Module, 
    getFullpp
} = require("../lib");

Module({
    pattern: "setpp",
    fromMe: true,
    desc: "set profile picture",
    type: "user",
  },
  async (message, match, m) => {
    if (!message.reply_message.image)
      return await message.reply("_Reply to a photo_");
    let buff = await m.quoted.download();
    await message.setPP(message.user, buff);
    return await message.reply("_Profile Picture Updated_");
  }
);

Module(
  {
    pattern: "fullpp",
    fromMe: true,
    desc: "set full screen profile picture",
    type: "user",
  },
  async (message, match,m) => {
    if (!message.reply_message.image)
      return await message.reply("_Reply to a photo_");
    let media = await m.quoted.download();
    await getFullpp(message.user, media, message);
    return await message.reply("_Profile Picture Updated_");
  }
);




Module({
    pattern: "setname",
    fromMe: true,
    desc: "set User name",
    type: "whatsapp",
  }, async (message, match, m) => {
    if (!match) return await message.reply("_Enter name_");
    await message.updateName(match);
    return await message.reply(`_Username Updated : ${match}_`);
  }
);

Module({
	pattern: 'setbio ?(.*)',
	fromMe: true,
	desc: 'to change your profile status',
	type: 'whatsapp'
}, async (message, match) => {
	match = match || message.reply_message.text
	if (!match) return await message.reply('*Need Status!*\n*Example: setbio Hey there! I am using WhatsApp*.')
	await message.client.updateProfileStatus(match)
	await message.reply('_Profile status updated_')
})

Module({
    pattern: "block",
    fromMe: true,
    desc: "block a person",
    type: "user",
  }, async (message, match, m) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.replyMessage(`_@${jid.split("@")[0]} Blocked_`, {
        mentions: [jid],
      });
    } else {
      await message.block(message.jid);
      return await message.reply("_User blocked_");
    }
  }
);



Module({
    pattern: "unblock",
    fromMe: true,
    desc: "unblock a person",
    type: "user",
  }, async (message, match, m) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.reply(`_@${jid.split("@")[0]} unblocked_`, {
        mentions: [jid],
      });
    } else {
      await message.unblock(message.jid);
      return await message.reply("_User unblocked_");
    }
  }
);



Module({
    pattern: "jid",
    fromMe: true,
    desc: "give jid of chat/user",
    type: "user",
  }, async (message, match, m) => {
    return await message.reply(
      message.mention[0] || message.reply_message.jid || message.jid
    );
  }
);



Module({
    pattern: "dlt",
    fromMe: true,
    desc: "deletes a message",
    type: "whatsapp",
  },
  async (message, match,m,client) => {
    if (message.isGroup) {

     return await message.client.sendMessage(message.jid,
        {
            delete: {
                remoteJid: message.jid,
                fromMe: false,
                id: message.reply_message.key.id,
                participant: message.key.participant
            }
        })


    } else {    message.client.sendMessage(message.jid, { delete: message.reply_message.key })
    }
  }
);
