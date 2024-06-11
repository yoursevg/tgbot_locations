require('dotenv').config();
const { Telegraf } = require('telegraf');
const { sequelize, connectDB } = require('./config/db');
const Location = require('./models/Location');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const startBot = async () => {
    await connectDB(); // Проверка подключения к базе данных

    bot.start((ctx) => {
        ctx.reply('Добро пожаловать! Сколько дней вы планируете провести в Москве?');
    });

    bot.on('text', async (ctx) => {
        const days = parseInt(ctx.message.text, 10);
        if (isNaN(days)) {
            return ctx.reply('Пожалуйста, введите корректное количество дней.');
        }

        // Пример простого маршрута
        const locations = await Location.findAll({ limit: 5 });
        let route = `Ваш маршрут на ${days} дней:\n`;
        locations.forEach((location, index) => {
            route += `${index + 1}. ${location.name}: ${location.description}\n`;
        });

        console.log('Generated Route:', route); // Отладочная информация

        // Генерация PDF
        const doc = new PDFDocument({ size: 'A4', encoding: 'UTF-8' });
        const fileName = `route-${Date.now()}.pdf`;
        const stream = fs.createWriteStream(fileName);
        doc.pipe(stream);
        doc.font('fonts/DejaVuSans.ttf'); // Установите шрифт, поддерживающий кириллицу
        doc.text(route, {
            align: 'left'
        });
        doc.end();

        stream.on('finish', () => {
            ctx.replyWithDocument({ source: fileName });
        });
    });

    bot.launch();
    console.log('Bot is running...');
};

startBot();
