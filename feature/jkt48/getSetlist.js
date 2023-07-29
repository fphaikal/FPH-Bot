const {MessageMedia} = require("whatsapp-web.js")

const getSetlist = async (body, message) => {
  const query = body.slice(9);
  try {
    const dataSetlist = require("../../database/setlist-theater");

    const searchResults = [];

    const filteredResults = dataSetlist.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    searchResults.push(...filteredResults);

    
    if (searchResults.length > 0) {
      let reply = `Hasil Pencarian Setlist: ${query}\n`;
      const img = searchResults[0].image;

      searchResults.forEach((setlist, index) => {
        const nama = setlist.name;
        const originalName = setlist.originalname;
        const description = setlist.description;
        const lagu = setlist.songs;
        const formattedDescription = description ? description : 'Tidak Ada Deskripsi';
        reply += `
Name: ${nama}
Original Name: ${originalName}\n
${formattedDescription}\n
Daftar Lagu:
${lagu.length > 0 ? lagu.map((song, songIndex) => `${songIndex + 1}. ${song.title} (${song.translatedTitle})`).join('\n'): 'Tidak Ada Lagu'}`;
      });

      const chat = await message.getChat();
      const media = await MessageMedia.fromUrl(img);
      chat.sendMessage(media, {caption: `${reply}`});
    } else {
        message.reply(`Tidak ada hasil pencarian untuk "${query}".`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSetlist,
};
