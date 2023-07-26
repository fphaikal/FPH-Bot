const ka = require('kyouka-api');
const lyrics = require('lyric-api');

const getLirik = async(body, message) => {
    const judul = body.split(' ')[1];

    try {
        console.log(await lyrics.fetch(judul, 1))
    } catch (error) {
        console.log('[lyric-api]:', error.message, error.stack)
    }
}

module.exports = {
    getLirik,
}