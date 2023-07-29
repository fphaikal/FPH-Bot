const axios = require("axios");

const getScheduled = async (message) => {
  try {
    const response = await axios.get(
      "https://showroom-admin.ikhbaldwiyan.repl.co/schedules"
    );
    const acaraList = response.data;

    if (acaraList) {
      let messageText = "=== Jadwal Theater JKT48 ===\n";

      const acaraList = response.data;
      const today = new Date();
      const todayDate = today.getDate();
      const todayMonth = today.getMonth();
      const todayYear = today.getFullYear();

      // Filter acara yang setelah atau sama dengan tanggal hari ini
      const upcomingAcaraList = acaraList.filter((acara) => {
        const showDate = new Date(acara.showDate);
        const acaraDate = showDate.getDate();
        const acaraMonth = showDate.getMonth();
        const acaraYear = showDate.getFullYear();

        // Bandingkan tanggal, bulan, dan tahun
        if (acaraYear > todayYear) {
          return true;
        } else if (acaraYear === todayYear && acaraMonth > todayMonth) {
          return true;
        } else if (
          acaraYear === todayYear &&
          acaraMonth === todayMonth &&
          acaraDate >= todayDate
        ) {
          return true;
        }

        return false;
      });

      upcomingAcaraList.forEach((acara) => {
        const formattedShowDate = new Date(acara.showDate).toLocaleDateString(
          "id-ID",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        const setlistName = acara.setlist.name;
        const showDate = formattedShowDate;
        const showTime = acara.showTime;
        const link = acara.ticketShowroom;
        const stageNames = acara.memberList
          .map((member) => member.stage_name)
          .join(", ");

        messageText += `  
*Nama Setlist:* ${setlistName}
*Tanggal Pertunjukan:* ${showDate}
*Waktu Pertunjukan:* ${showTime}
*Entrance URL:* ${link}
*Lineup Member:* \n${stageNames}\n
====================\n`;
      });
      message.reply(messageText);
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
