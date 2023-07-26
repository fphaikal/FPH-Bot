const movier = require("movier");

const getImdb = async (body, message) => {
  const title = body.split(" ")[1];
  await message.reply("Tunggu Sebentar...");

  try {
    const links = await movier.getTitleDetailsByName(title);

    const name = links.name;
    const year = links.titleYear;
    const genres = links.genres;
    const { rate, rateSource, votesCount } = links.mainRate;
    const MAX_CASTS_TO_DISPLAY = 6;
    const casts = links.casts.slice(0, MAX_CASTS_TO_DISPLAY).map((cast) => {
        const roleName =
            cast.roles && cast.roles[0] ? cast.roles[0].name : "Role not specified";
        return `- ${cast.name} (${roleName})`;
    });

    message.reply(`*Name:* ${name}\n*Year:* ${year}\n*Genres:* ${genres.join(', ')}\n*Rate:* ${rate} (${rateSource}) - ${votesCount} votes\n*Casts:*\n${casts.join('\n')}`);

  } catch (error) {
    console.error("Error Get Data IMDb:", error);
    message.reply("Maaf, terjadi kesalahan saat mengambil data IMDb.");
  }
};

module.exports = {
  getImdb,
};
