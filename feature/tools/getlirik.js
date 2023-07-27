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
      } catch (error) {
        console.error("Error:", error.message);
      }
}

module.exports = {
    getLirik,
}