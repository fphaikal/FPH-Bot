const axios = require("axios");

const getScheduled = async (message) => {
  try {
    const response = await axios.get(
      "https://jkt48-showroom-api.vercel.app/api/rooms/theater-schedule"
    );
    const data = response.data; // Mengambil data pertama dari array respons

    if (data) {
      let messageText = "===== Jadwal Theater JKT48 =====\n";
      const data = response.data;
      data.forEach((item) => {
        const roomName = item.room_name;
        const title = item.title;
        const entranceUrl = item.entrance_url;
        messageText += 
`  
Nama Room: ${roomName}
Setlist: ${title}
Entrance URL: ${entranceUrl}\n
========================\n`;
      });
      message.reply(messageText)

    } else {
      message.reply("Tidak Ada Theater dalam Waktu Dekat.");
    }
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    message.reply("Terjadi kesalahan saat mengambil informasi.");
  }
};

module.exports = {
  getScheduled,
};
