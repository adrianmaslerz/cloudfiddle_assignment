import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger('BinanceService');
  private readonly baseUrl = 'https://api.binance.com';

  constructor(private readonly http: HttpService) {}

  public async getHistoricalDataForSymbol(
    symbol: string,
    interval: string,
    startTime: number,
    endTime: number,
  ) {
    try {
      const url = `${this.baseUrl}/api/v3/klines`;
      const params = {
        symbol,
        interval,
        startTime,
        endTime,
      };

      return this.http.axiosRef.get(url, { params });
    } catch (error) {
      this.logger.error(
        `Failed to fetch historical data for ${symbol}: ${error.message}`,
      );
      throw new HttpException(
        'Failed to fetch historical data from Binance',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
