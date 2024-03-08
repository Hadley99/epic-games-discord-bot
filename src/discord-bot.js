import { Client } from 'node-appwrite';
import { WebhookClient } from 'discord.js';
import { getFreeGames, createEmbedObjects } from '../helpers/getGames.js';

import { config } from 'dotenv';
config();

export default async ({ req, res, log, error }) => {
  try {
    // You can log messages to the console
    log('Hello, Logs!');

    const games = await getFreeGames();
    const freeGames = games.filter(({ isFreeGame }) => isFreeGame);

    console.log('😋 found free games 😋', freeGames);

    const embedGames = freeGames.map(createEmbedObjects);
    const webhook = new WebhookClient({
      id: process.env.WEBHOOK_ID,
      token: process.env.WEBHOOK_TOKEN,
    });

    console.log('🚀 ready to send to discord!! 🚀');

    await webhook
      .send({
        embeds: embedGames,
      })
      .then(() => {
        return res.json({
          success: true,
          message: '🎉 successfully sent message to discord! 🎉',
        });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    error('😧 Oh no, error!', error);
    throw error;
  }
};
