import express from 'express';
import { discordBot } from './discordBot.js';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get(
  '/api/discordBot',
  discordBot
  // (req, res) => res.send('Discord Bot is running!')
);

app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;
