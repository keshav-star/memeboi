const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('static'))
app.use(express.json());
require("dotenv").config();

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(token, { polling: false });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

let imageUrl;

// fetch('https://meme-api.com/gimme')
//     .then(response => response.json())
//     .then(data => { 
//         console.log(data.preview[2]) })

// console.log(imageUrl)



async function sendDailyMessage() {

   try {
    const response = await fetch('https://meme-api.com/gimme');
    const meme = await response.json();
    console.log()
    const imageUrl = await meme.preview[meme.preview.length-1];
    bot.sendPhoto(chatId, imageUrl)
   } catch (error) {
    console.log(error)
   }
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

sendDailyMessage()

cron.schedule('*/30 * * * *', () => {
    sendDailyMessage();
});