const { Client, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const cheerio = require("cheerio");
const  snapsave  = require("snapsave-downloader")

const getIG = async (body, message) => {
  const instagramUrl = body.split(' ')[1];
  await message.reply("Tunggu Sebentar...");

  try {
    let links = await snapsave(instagramUrl);
    console.log(links);
    
    const mediaURLs = links.data.map(item => item.url);

    const chat = await message.getChat();
    for (const url of mediaURLs) {
      const media = await MessageMedia.fromUrl(url);
      chat.sendMessage(media);
    }
 
  } catch (error) {
    console.error('Error downloading Instagram media:', error.message);
    message.reply('Maaf, terjadi kesalahan saat mengunduh dan mengirim media dari Instagram.');
  }
};




module.exports = {
  getIG,
};
