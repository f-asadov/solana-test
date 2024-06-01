import { Controller, Get } from '@nestjs/common';
import { DexscreenerService } from './services/dexscreener.service';
import { SolanaService } from './services/solana.service';

@Controller()
export class AppController {
  constructor(private readonly dexscreenerService: DexscreenerService,
    private readonly solanaService: SolanaService) { }

    @Get('/token')
    async getTokenInfo() {
      const tokenAddress = 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN';
  
      const liquidity = await this.dexscreenerService.getLiquidityInUSD(tokenAddress);
      const latestTransaction = await this.solanaService.getLatestTransactionInfo(tokenAddress);
  
      return {
        liquidityUSD: liquidity,
        ...latestTransaction
      };
    }
}
