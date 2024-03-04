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

client.login(process.env.BOT_TOKEN).then(() => {
  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    channel
      .send({
        embeds: embedGames,
      })
      .then(() => {
        client.destroy();
      });
  });
});
