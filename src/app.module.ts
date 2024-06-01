import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DexscreenerService } from './services/dexscreener.service';
import { SolanaService } from './services/solana.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DexscreenerService,SolanaService],
})
export class AppModule {}
