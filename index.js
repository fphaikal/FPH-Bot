const qrcode = require("qrcode-terminal");
const fs = require('fs');
const axios = require("axios");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const { getLive } = require("./feature/jkt48/srlive");
const { getScheduled } = require("./feature/jkt48/theater-scheduled");
const { getSearchMember } = require("./feature/jkt48/search-member");
const { getAnggota } = require("./feature/jkt48/anggota");
const { getTiktok } = require("./feature/downloader/tiktok");
const { getTrainee } = require("./feature/jkt48/trainee");
const { getIG } = require("./feature/downloader/ig");
const { getSearchMemberAcademy } = require("./feature/jkt48/search-academy");
const { getRecentLive } = require("./feature/jkt48/recentLive");
const { getRecentLiveMember } = require("./feature/jkt48/recentLiveMember");
const { toSticker } = require("./feature/tools/toSticker");
const { chatGPT } = require("./feature/tools/chatGPT");
const { getImdb } = require("./feature/tools/getImdb");
const { getQuotesAnim } = require("./feature/tools/quotesAnim");
const { getLirik } = require("./feature/tools/getlirik");
const author = "Fahreza Pasha Haikal";
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});



client.on("ready", () => {
  console.log("================================================");
  console.log("==========         FPH BOT            ==========");
  console.log("================================================");
  console.log(`Author     : ${author}`);
  console.log("API From   : Ikhbal Dwiyantoro");
  console.log("Status     : Bot WhatsApp telah terhubung!");

});


client.on("message", async (message) => {
  const { body, from } = message;
  console.log(`Pesan dari: ${from}\nPesan: ${body}\n`);

  // Menghandle pesan yang diterima
  if (body === "#") {
    await message.reply(
      `-------------Info-------------
Author  : ${author}
Contact : wa.me/6285765909380
------------------------------
Selamat datang di FPH Bot!

1. Seputar JKT48
2. Downloader
3. Tools`
    );
  } else if (body === "1") {
    message.reply(
      `Silahkan pilih:\n
*!live* (Info SHOWROOM Member)
*!jadwal* (Jadwal Theater JKT48)
*!anggota* (List Member)
*!trainee* (List Trainee)
*!recent* (Member yang Terakhir Kali LIVE)

Search Feature:
*? (nama)* (Cari Member)
*?trainee (nama)* (Cari Member Trainee, dan Academy)
*?recent (nama)* (Cari Member Kapan Terakhir Kali LIVE)`
    );
  } else if (body === "2") {
    message.reply(
      `Silahkan Pilih:
*/ig (url)* (Download Media Instagram)
*/tt (url)* (Download Media Tiktok)`)
  } else if (body === "3") {
    message.reply(
      `Silahkan Pilih:
*!sticker* (Mengubah Foto Menjadi Stiker)
*!sticker (nama)* (Mengubah Foto Menjadi Stiker dan Memberikan Nama Stiker)`)
  }

  // JKT48
  if (body === "!live") {
    await getLive(message);
  }
  if (body === "!jadwal") {
    await getScheduled(message);
  }
  if (body.startsWith("? ")) {
    await getSearchMember(body, message);
  }
  if (body.startsWith("?trainee ")) {
    await getSearchMemberAcademy(body, message);
  }
  if (body === "!anggota") {
    await getAnggota(message);
  }
  if (body === "!trainee") {
    await getTrainee(message);
  }
  if (body === "!recent") {
    await getRecentLive(message);
  }
  if (body.startsWith("?recent ")) {
    await getRecentLiveMember(body, message);
  }

  // Downloader
  if (body.startsWith('/tt ')) {
    await getTiktok(body, message);
  }
  if (body.startsWith('/ig ')) {
    await getIG(body, message);
  }

  //Tools
  if (body.startsWith('!sticker ') && message.type === 'image') {
    const name = body.split(' ')[1];
    const media = await message.downloadMedia();

    client.sendMessage(message.from, media, {
      sendMediaAsSticker: true,
      stickerAuthor: 'FPHaikal',
      stickerName: `${name}`
    });
  }
  if (body.startsWith('/ask ')) {
    await chatGPT(body, message);
  }
  if(body.startsWith('/imdb ')) {
    await getImdb(body, message);
  }
  if(body === "/quotes") {
    await getQuotesAnim(message);
  }
  if(body.startsWith('/lirik ')) {
    await getLirik(body,message);
  }
});

client.initialize();
