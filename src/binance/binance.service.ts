import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { KlineResponse } from './kline-response.type';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger('BinanceService');
  private readonly baseUrl = 'https://api.binance.com';

  constructor(private readonly http: HttpService) {}

  public async getHistoricalDataForSymbol(
    symbol: string,
    interval: string,
    startTime?: number,
    endTime?: number,
  ): Promise<KlineResponse> {
    try {
      const url = `${this.baseUrl}/api/v3/klines`;
      const params = {
        symbol,
        interval,
      };

      if (startTime) {
        params['startTime'] = startTime;
      }
      if (endTime) {
        params['endTime'] = endTime;
      }

      const { data } = await this.http.axiosRef.get<KlineResponse>(url, {
        params,
      });

      return data;
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
