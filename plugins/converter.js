const { 
    Module, 
    isPublic, 
    getJson, 
    sleep, 
    tiny, 
    webp2mp4, 
    toAudio
} = require("../lib/");
const config = require("../config");
const { Image } = require("node-webpmux");

Module(
  {
    pattern: "sticker",
    fromMe: isPublic,
    desc: "converts photo or video to stickers",
    type: "converter",
  },
  async (message, match, m) => {
    if (!(message.reply_message.video || message.reply_message.image))
      return await message.reply("_Reply to photo or video_");
    let buff = await m.quoted.download();
    message.sendMessage(
      buff,
      { packname: message.pushName, quoted: message },
      "sticker"
    );
  }
);

Module({
          pattern: 'rvtxt ?(.*)',
          fromMe: isPublic,
          desc: 'reverse the given text',
          type: 'converter'}, 
          async (m, match) => {
match = match || m.reply_message.text
if (!match) return await m.reply("_Give me a text to reverse_")
await m.reply(match.split("").reverse().join(""))
});

Module({
         pattern: 'base64|b64 ?(.*)',
         fromMe: isPublic, 
         desc: 'base64 encoder',
         type: 'converter'}, 
         
          async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("_Give me text to encode_")
await m.reply(btoa(match));
});

Module({
         pattern: 'dbase64|db64 ?(.*)',
         fromMe: isPublic,
         desc: 'base64 decoder', 
         type: 'converter'},
         
         async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("_Give me text to encode_")
await m.reply(atob(match));
});

Module({
         pattern: 'hex ?(.*)', 
         fromMe: isPublic,
         desc: 'hex encoder',
         type: 'converter'}, 
         
         async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("_Give me text to encode_")
await m.reply(Buffer.from(match, 'utf8').toString('hex'));
});

Module({
         pattern: 'dhex ?(.*)', 
         fromMe: isPublic,
         desc: 'hex decoder', 
         type: 'converter'}, 
         
         async (m, match, client) => {
match = match || m.reply_message.text
if(!m.reply_message.text) return await m.reply("_Give me text to encode_")
await m.reply(Buffer.from(match, 'hex').toString());
});

Module(
  {
    pattern: "take",
    fromMe: isPublic,
    desc: "change sticker & audio name",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message && !message.reply_message.sticker)
      return await message.reply("_Reply to sticker_");
    let buff = await m.quoted.download();
    let [packname] = match.split(",");
    await message.sendMessage(
      buff,
      {
        packname: packname, quoted: message
      },
      "sticker"
    );
  }
);



Module(
  {
    pattern: "getexif",
    fromMe: true,
    desc: "get sticker information",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message || !message.reply_message.sticker)
      return await message.reply("_Reply to sticker_");
    let img = new Image();
    await img.load(await m.quoted.download());
    const exif = JSON.parse(img.exif.slice(22).toString());
    await message.reply(exif);
  }
);

Module(
  {
    pattern: "mp3",
    fromMe: isPublic,
    desc: "converts video/audio/voice to mp3",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message || (!message.reply_message.video && !message.reply_message.audio)) return await message.reply('Reply at audio/voice/video')  
    let buff = await m.quoted.download();
    buff = await toAudio(buff, "mp3");
    return await message.sendMessage(buff, { mimetype: "audio/mpeg", quoted: message }, "audio");
  }
);

Module(
  {
    pattern: "photo",
    fromMe: isPublic,
    desc: "changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(buff, {quoted: message}, "image");
  }
);

Module(
  {
    pattern: "mp4",
    fromMe: isPublic,
    desc: "changes sticker to video",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    let buffer = await webp2mp4(buff);
    return await message.sendMessage(buffer, { quoted: message }, "video");
  }
);


					    
