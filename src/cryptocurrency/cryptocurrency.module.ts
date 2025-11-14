import { Module } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { BinanceModule } from '../binance/binance.module';

@Module({
  imports: [BinanceModule],
  providers: [CryptocurrencyService],
  controllers: [CryptocurrencyController],
})
export class CryptocurrencyModule {}
