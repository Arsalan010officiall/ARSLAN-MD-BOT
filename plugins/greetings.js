const { 
    Module, 
    setMessage, 
    getMessage, 
    delMessage, 
    getStatus, 
    toggleStatus 
} = require("../lib/");

Module(
  {
    pattern: "welcome",
    fromMe: true,
    desc: "send our welcome message in group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return;
    let { prefix } = message;
    let status = await getStatus(message.jid, "welcome");
    let stat = status ? "on" : "off";

    if (!match) {
      let replyMsg = `_Welcome manager_\n\n_Group: ${
        (await message.client.groupMetadata(message.jid)).subject
      }_\n_Status: ${stat}_\n\n_Example : https://github.com/Afx-Abu/Abu-MD/wiki/_`;

      return await message.reply(replyMsg);
    }

    if (match === "get") {
      let msg = await getMessage(message.jid, "welcome");
      if (!msg) return await message.reply("_There is no welcome set_");
      return message.reply(msg.message);
    }

    if (match === "on") {
      let msg = await getMessage(message.jid, "welcome");
      if (!msg)
        return await message.reply("_There is no welcome message to enable_");
      if (status) return await message.reply("_Welcome already enabled_");
      await toggleStatus(message.jid);
      return await message.reply("_Welcome enabled_");
    }

    if (match === "off") {
      if (!status) return await message.reply("_Welcome already disabled_");
      await toggleStatus(message.jid, "welcome");
      return await message.reply("_Welcome disabled_");
    }

    if (match == "delete") {
      await delMessage(message.jid, "welcome");
      return await message.reply("_Welcome deleted successfully_");
    }
    await setMessage(message.jid, "welcome", match);
    return await message.reply("_Welcome set successfully_");
  }
);

Module(
  {
    pattern: "goodbye",
    fromMe: true,
    desc: "send goodbye messages",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return;
    let status = await getStatus(message.jid, "goodbye");
    let stat = status ? "on" : "off";
    let replyMsg = `_Welcome manager_\n\n_Group: ${
        (await message.client.groupMetadata(message.jid)).subject
      }_\n_Status: ${stat}_\n\n_Example : https://github.com/Afx-Abu/Abu-MD/wiki/_`;

    if (!match) {
      return await message.reply(replyMsg);
    }

    if (match === "get") {
      let msg = await getMessage(message.jid, "goodbye");
      if (!msg) return await message.reply("_There is no goodbye set_");
      return message.reply(msg.message);
    }

    if (match === "on") {
      await toggleStatus(message.jid, "goodbye");
      return await message.reply("_Goodbye enabled_");
    }

    if (match === "off") {
      await toggleStatus(message.jid);
      return await message.reply("_Goodbye disabled_");
    }

    if (match === "delete") {
      await delMessage(message.jid, "goodbye");
      return await message.reply("_Goodbye deleted successfully_");
    }

    await setMessage(message.jid, "goodbye", match);
    return await message.reply("_Goodbye set successfully_");
  }
);
