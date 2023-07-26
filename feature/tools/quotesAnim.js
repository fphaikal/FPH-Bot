const ka = require("kyouka-api");

const getQuotesAnim = async (message) => {
  ka.quotesAnime().then((result) => {
    console.log(result);

    message.reply(result);
  });
};

module.exports = {
  getQuotesAnim,
};
