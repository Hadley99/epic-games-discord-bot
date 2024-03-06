import express from 'express';
import discordBot from './discord-bot';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/discordBot', discordBot);

export default app;
