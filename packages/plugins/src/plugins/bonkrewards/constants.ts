import { PublicKey } from '@solana/web3.js';
import { Platform } from '@sonarwatch/portfolio-core';

export const platformId = 'bonkrewards';
export const platform: Platform = {
  id: platformId,
  name: 'Bonk Rewards',
  image: 'https://sonar.watch/img/platforms/bonk.png',
  // defiLlamaId: 'nothing yet',
};
export const stakePid = new PublicKey(
  'STAKEkKzbdeKkqzKpLkNQD3SUuLgshDKCD7U8duxAbB'
);
export const stakePool = '9AdEE8AAm1XgJrPEs4zkTPozr3o4U5iGbgvPwkNdLDJ3';
export const bonkMint = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';
export const bonkDecimals = 5;
