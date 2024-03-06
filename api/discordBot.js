import { WebhookClient } from 'discord.js';
import { getFreeGames, createEmbedObjects } from '../getGames.js';

import { config } from 'dotenv';
config();

export default async (req, res) => {
  try {
    const games = await getFreeGames();
    const freeGames = games.filter(({ isFreeGame }) => isFreeGame);

    const embedGames = freeGames.map(createEmbedObjects);
    const webhook = new WebhookClient({
      id: '1214411053161652286',
      token:
        '4ZBe4-DuwTv2hUR05p02v0GYyaLebEIA5X4IwisvVWtwGu9tIwZa3ladxy0_BMliiOyZ',
    });

    webhook
      .send({
        embeds: embedGames,
      })
      .then(() => {
        return res.send('Bot finished running!');
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
