const { Google, Musixmatch } = require("@flytri/lyrics-finder");

const getLirik = async(body, message) => {
    const judul = body.slice(7);

    try {
        const get = await Google(judul);

        if(get) {
            let reply = `*Hasil pencarian untuk "${get.title}*":\n\n`;
                reply += `${get.lyrics}`;

            message.reply(reply);
        } 

        console.log(get);
      } catch (error) {
        console.error("Error:", error.message);
        message.reply("Tidak Ada Hasil yang Ditemukan");
      }
}

module.exports = {
    getLirik,
}