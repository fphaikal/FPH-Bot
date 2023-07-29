const axios = require("axios");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const ChatAIHandler = async (body, message) => {
  const cmd = body.split("/");

  message.reply("sedang diproses, tunggu bentar ya.");

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: body,
    max_tokens: 7,
    temperature: 0,
  });

  message.reply(response)
};

module.exports = {
  ChatAIHandler,
};
