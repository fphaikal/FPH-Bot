require('dotenv').config(); // Memuat variabel lingkungan dari file .env

const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatGPT = async (body, message) => {
  let text = body.slice(5);

  try {
    var qst = `Q: ${text}\nA:`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: qst,
      temperature: 0,
      max_tokens: 300,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    message.reply(response.data.choices[0].text);
  } catch (error) {
    console.error("Error downloading Instagram media:", error.message);
    message.reply(
      "Maaf, terjadi kesalahan saat mengambil data ChatGPT"
    );
  }
};

module.exports = {
  chatGPT,
};
