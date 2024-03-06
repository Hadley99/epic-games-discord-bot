import express from 'express';
import discordBot from './discord-bot.js';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/discord-bot', discordBot);

export default app;
