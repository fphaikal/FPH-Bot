const axios = require("axios");

const getSearchMember = async(body, message) => {
    const query = body.slice(2); // Mengambil query pencarian dari pesan

    try {
      const response = await axios.get('https://jkt48-showroom-api.vercel.app/api/rooms/');
      const data = response.data;
      const liveStatus = data.is_live ? "Lagi LIVE Nih..." : "Sedang Tidak LIVE";


      const searchResults = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

      if (searchResults.length > 0) {
        let reply = `Hasil pencarian untuk "${query}":\n\n`;
        searchResults.forEach((result) => {
            reply += `${result.description.replace(/"/g, "")}\n\n`;
            reply += `Status: ${liveStatus}\n`;
            reply += `Room SR: https://www.showroom-live.com/r/${result.url_key}`;
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
    getSearchMember
}