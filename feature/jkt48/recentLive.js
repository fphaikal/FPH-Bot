const axios = require('axios');
const {formatLongDate} = require('../../utils/formatLongDate');
const { MessageMedia } = require("whatsapp-web.js");
const {formatNumber} = require('../../utils/formatNumber');
const { getLiveDuration } = require('../../utils/geLiveDuration');

const getRecentLive = async(message) => {
    await message.reply("Tunggu Sebentar...");

    try {
        const response = await axios.get("https://dc.crstlnz.site/api/showroom/recent?sort=date&page=1&filter=active&order=-1&perpage=1"); // Ganti URL REST API dengan URL yang sesuai
        const recent = response.data.recents[0];
        const img = recent.member.img;
        
        
        if (recent) {
          let messageText = '========================\n'
          const data = response.data.recents;
          data.forEach((item) => {
            const username = item.member.name;
            const viewCount = item.live_info.viewers;
            const duration = item.live_info.duration;
            const gift = item.points;
            const liveStart = item.live_info.date.start;
            const liveEnd = item.live_info.date.end;

            
            messageText += `*${username}Telah Selesai Showroom*\n\n*Mulai:* ${formatLongDate(liveStart)}\n*Selesai:* ${formatLongDate(liveEnd)}\n\n*Penonton:* ${formatNumber(viewCount)}\n*Durasi:* ${getLiveDuration(duration)}\n*Gift:* ${formatNumber(gift)} G\n========================\n`;
          });

          const chat = await message.getChat();
          const media = await MessageMedia.fromUrl(img);
          chat.sendMessage(media, {caption: `${messageText}`});
        } else {
          message.reply("Tidak Ada Member yang Sedang LIVE. Periksa Kembali Nanti");
        }
      } catch (error) {
        console.error("Error checking live status:", error);
        message.reply("Maaf, terjadi kesalahan saat memeriksa status live.");
      }

}

module.exports = {
    getRecentLive
}