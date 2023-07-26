const { client, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const cheerio = require("cheerio");
const download = require("@phaticusthiccy/open-apis");

const getTiktok = async (body, message) => {
  const tiktokUrl = body.split(' ')[1];
  await message.reply("Tunggu Sebentar...");
  
  try {
    var data = await download.tiktok(tiktokUrl)
    console.log(data)
 
    const response = data.server1.video;

    const chat = await message.getChat();
    const media = await MessageMedia.fromUrl(response);
    chat.sendMessage(media);

  } catch (error) {
    console.error('Error downloading Instagram media:', error.message);
    message.reply('Maaf, terjadi kesalahan saat mengunduh dan mengirim media dari Instagram.');
  }
};

module.exports = {
  getTiktok,
};
