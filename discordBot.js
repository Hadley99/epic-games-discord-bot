import { Client, GatewayIntentBits } from 'discord.js';
import { getFreeGames, createEmbedObjects } from './getGames.js';

import { config } from 'dotenv';
config();

const games = await getFreeGames();
const freeGames = games.filter(({ isFreeGame }) => isFreeGame);

const embedGames = freeGames.map(createEmbedObjects);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once('ready', () => {
  console.log('Bot is ready!');

  const channel = client.channels.cache.get(process.env.CHANNEL_ID);

  channel.send({
    embeds: embedGames,
  });
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
