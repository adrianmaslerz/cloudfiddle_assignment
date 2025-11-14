import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceModule } from './binance/binance.module';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';

@Module({
  imports: [BinanceModule, CryptocurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
