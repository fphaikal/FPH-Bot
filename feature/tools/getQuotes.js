const getQuotesData = require("../../data/quotes");

const getQuotes = async(message) => {
  try {
    const randomData = getRandomQuote();

    if(randomData) {
      const quoteMessage = `${randomData.quotes}\n - ${randomData.name}`
      message.reply(quoteMessage);
    }
  } catch (error) {
    console.log(error)
  }
}

function getRandomQuote() {
  return getQuotesData[Math.floor(Math.random() * getQuotesData.length)];
}

module.exports = {
  getQuotes,
};
