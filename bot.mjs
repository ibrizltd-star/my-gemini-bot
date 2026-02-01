import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenerativeAI } from '@google/generative-ai';
import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
}).listen(process.env.PORT || 3000);

const token = '8546121789:AAGviVwAPr1Fu4_Wvd2iFDMbJzc0QGw0mpg';
const genAI = new GoogleGenerativeAI('AIzaSyCePxAxFCzUmIK5GxxzsErEmvG_ztDBzp8');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(msg.text);
    const response = await result.response;
    bot.sendMessage(msg.chat.id, response.text());
  } catch (error) {
    bot.sendMessage(msg.chat.id, "Error: " + error.message);
  }
});

console.log('BOT_READY');
