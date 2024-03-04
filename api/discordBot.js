import { Client, GatewayIntentBits } from 'discord.js';
import { getFreeGames, createEmbedObjects } from '../getGames.js';

import { config } from 'dotenv';
config();

export default async (req, res) => {
  const games = await getFreeGames();
  const freeGames = games.filter(({ isFreeGame }) => isFreeGame);

  const embedGames = freeGames.map(createEmbedObjects);

  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  return client
    .login(process.env.BOT_TOKEN)
    .then(() => {
      client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);

        const channel = client.channels.cache.get(process.env.CHANNEL_ID);

        return channel
          .send({
            embeds: embedGames,
          })
          .then(async () => {
            console.log('ran');
            // return await client.destroy();
          });
      });
    })
    .then(() => {
      return new Response('Bot finished running!');
      // return res.status(200)('Bot finished running!');
    });
};
