import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenerativeAI } from '@google/generative-ai';
import http from 'http';

http.createServer((req, res) => res.end('Bot is running')).listen(process.env.PORT || 3000);

// ВСТАВЬ СВОИ ДАННЫЕ НИЖЕ
const token = '8546121789:AAGviVwAPr1Fu4_Wvd2iFDMbJzc0QGw0mpg';
const genAI = new GoogleGenerativeAI('AIzaSyCePxAxFCzUmIK5GxxzsErEmvG_ztDBzp8');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(text);
    const response = await result.response;
    bot.sendMessage(chatId, response.text());
  } catch (error) {
    bot.sendMessage(chatId, "Ошибка: " + error.message);
  }
});

console.log('--- БОТ ВКЛЮЧЕН (PRO ВЕРСИЯ) ---');
