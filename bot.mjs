

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenerativeAI } from '@google/generative-ai';
import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is alive');
}).listen(process.env.PORT || 3000);

const token = '8546121789:AAGviVwAPr1Fu4_Wvd2iFDMbJzc0QGw0mpg';
const genAI = new GoogleGenerativeAI('AIzaSyCePxAxFCzUmIK5GxxzsErEmvG_ztDBzp8');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  try {
    const model = const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(text);
    const response = await result.response;
    bot.sendMessage(chatId, response.text());
  } catch (error) {
    bot.sendMessage(chatId, "Error: " + error.message);
  }
});

console.log('--- BOT START ---');
