import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

export const getFreeGames = async () => {
  const raw = await fetch(process.env.EPIC_URL, {
    method: 'GET',
    headers: {
      accept: 'application/json, text/plain, */*',
    },
  });

  const res = await raw.json();

  const {
    data: {
      Catalog: {
        searchStore: { elements },
      },
    },
  } = res;

  const formattedGames = elements.map((game) => ({
    isFreeGame: game.price.totalPrice.discountPrice === 0,
    title: game.title,
    description: game.description,
    pageSlug: game.catalogNs.mappings[0].pageSlug,
    imageUrl: game.keyImages.find((ele) => ele.type === 'OfferImageWide')?.url,
  }));

  return formattedGames;
};

// 0xffa500 , 0x008000

export const createEmbedObjects = ({
  isFreeGame,
  title,
  pageSlug,
  description,
  imageUrl,
}) => ({
  color: isFreeGame ? 0x008000 : 0xffa500,
  title: title,
  url: `https://store.epicgames.com/en-US/p/${pageSlug}`,
  description,
  image: {
    url: imageUrl,
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: 'Epic Games Store',
  },
});
