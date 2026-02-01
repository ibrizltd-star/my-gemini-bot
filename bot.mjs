import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenerativeAI } from '@google/generative-ai';
import http from 'http';

http.createServer((req, res) => { res.writeHead(200); res.end('OK'); }).listen(process.env.PORT || 3000);

const token = '8546121789:AAGviVwAPr1Fu4_Wvd2iFDMbJzc0QGw0mpg';
// Попробуй создать НОВЫЙ ключ, если этот снова даст 404
const genAI = new GoogleGenerativeAI('AIzaSyCePxAxFCzUmIK5GxxzsErEmvG_ztDBzp8');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  if (!msg.text) return;

  try {
    // Используем максимально полную строку версии 1.5
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });
    const result = await model.generateContent(msg.text);
    const response = await result.response;
    bot.sendMessage(msg.chat.id, response.text());
  } catch (error) {
    bot.sendMessage(msg.chat.id, "Бот пока не видит модель. Ошибка: " + error.message);
  }
});

console.log('--- FINAL_TEST_START ---');
