const axios = require('axios');

const getAnggota = async(message) => {
    try {
        const response = await axios.get("https://jkt48-showroom-api.vercel.app/api/rooms/"); // Ganti URL REST API dengan URL yang sesuai
        const list = response.data;
        const liveStatus = list.is_live ? "Sedang LIVE" : "Tidak LIVE";

        let text = "Anggota JKT48:\n";
        list.forEach((item, index) => {
            text += `Nama: ${item.name}\n`;
            text += `Status: ${liveStatus}\n`;
            text += `Follower SR: ${item.follower_num}\n\n`
        });

        message.reply(text);
    } catch (error) {
        console.error("Error fetching list:", error);
        message.reply("Maaf, terjadi kesalahan saat mengambil daftar.");
    }
}

module.exports = {
    getAnggota
}