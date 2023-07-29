const axios = require("axios");

const getSearchMemberAcademy = async(body, message) => {
    const query = body.slice(9); // Mengambil query pencarian dari pesan

    try {
      const urls = [
        'https://jkt48-showroom-api.vercel.app/api/rooms/academy',
        'https://jkt48-showroom-api.vercel.app/api/rooms/trainee',
      ];

      const searchResults = [];

      for (const url of urls) {
        const response = await axios.get(url);
        const data = response.data;

        // Filter data berdasarkan nama yang mengandung query
        const filteredResults = data.filter(item => item.main_name.toLowerCase().includes(query.toLowerCase()));

        searchResults.push(...filteredResults);
      }

      if (searchResults.length > 0) {
        let reply = `Hasil pencarian untuk "${query}":\n\n`;

        searchResults.forEach((result) => {
          reply += `${result.description}\n`;
          reply += `Status: ${result.is_live ? "Lagi LIVE Nih..." : "Sedang Tidak LIVE"}\n`;
          reply += `Room SR: https://www.showroom-live.com/r/${result.room_url_key}\n\n`;
        });

        message.reply(reply);
      } else {
        message.reply(`Tidak ada hasil pencarian untuk "${query}".`);
      }
    } catch (error) {
      console.log('Terjadi kesalahan:', error);
      message.reply('Terjadi kesalahan saat melakukan pencarian.');
    }
}

module.exports = {
    getSearchMemberAcademy
}