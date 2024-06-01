import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DexscreenerService {
  async getLiquidityInUSD(tokenAddress: string): Promise<number> {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;
    
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.pairs && data.pairs.length > 0) {
      const liquidity = data.pairs[0].liquidity.usd;
      return liquidity;
    }

    throw new Error('Liquidity information not found');
  }
}
