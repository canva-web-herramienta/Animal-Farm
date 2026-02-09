import TelegramBot from "node-telegram-bot-api";
import axios from "axios";


const token = "TU_TOKEN_BOT";
const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/start (.+)/, async (msg, match) => {
const ref = match[1];
const wallet = msg.from.id.toString();


await axios.post("https://TU_API/register", { wallet, ref });


bot.sendMessage(msg.chat.id, "Bienvenido a TON Idle Miner 🚀", {
reply_markup: {
inline_keyboard: [[{ text: "🎮 Abrir juego", web_app: { url: "https://TU_WEB" } }]]
}
});
});


bot.onText(/\/start$/, async (msg) => {
const wallet = msg.from.id.toString();


await axios.post("https://TU_API/register", { wallet });


bot.sendMessage(msg.chat.id, "Bienvenido 🚀", {
reply_markup: {
inline_keyboard: [[{ text: "🎮 Abrir juego", web_app: { url: "https://TU_WEB" } }]]
}
});
});