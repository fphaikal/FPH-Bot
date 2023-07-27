const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");

const getLive = async (message) => {
  await message.reply(`Tunggu Sebentar...`);
  try {
    const response = await axios.get("https://jkt48-showroom-api.vercel.app/api/rooms/onlives"); // Ganti URL REST API dengan URL yang sesuai
    const isLive = response.data.is_live;

    if (isLive) {
      let messageText = '==========LIVE==========\n\n'
      const data = response.data.data;
      data.forEach((item) => {
        const username = item.main_name;
        const viewCount = item.view_num;
        const roomKey = item.room_url_key;
        const start = item.started_at;

        const formatTime = (n) => {
          return n < 10 ? '0' + n : n;
        };
        
        const getTimes = (dateInput) => {
          var date = new Date(dateInput);
          var time = `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
          return time;
        };
        
        const getTimeString = (times) => {
          var date = new Date();
          const hours = date.getHours() + ':' + date.getMinutes();
          const streamStarted = new Date(Date.now() - 1000 * (60 * 5));
        
          return times ? getTimes(times * 1000) : 'TBD';
        };
                

        messageText += `${username}Sedang LIVE SHOWROOM\nStarted At: ${getTimeString(start)}\nTayangan: ${viewCount}\n\nTonton: https://www.showroom-live.com/r/${roomKey}\n\n========================\n\n`;
      });
      message.reply(messageText);
    } else {
      message.reply("Tidak Ada Member yang Sedang LIVE. Periksa Kembali Nanti");
    }
  } catch (error) {
    console.error("Error checking live status:", error);
    message.reply("Maaf, terjadi kesalahan saat memeriksa status live.");
  }
};

module.exports = {
  getLive,
};
