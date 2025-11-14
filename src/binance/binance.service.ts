import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { KlineResponse } from './kline-response.type';
import { KlineInterface } from './kline.interface';

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
  ): Promise<KlineInterface[]> {
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

      return this.mapKlineResponseToInterface(data);
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

  private mapKlineResponseToInterface(
    response: KlineResponse,
  ): KlineInterface[] {
    return response.map((kline) => {
      return {
        openTime: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5]),
        closeTime: kline[6],
        quoteAssetVolume: parseFloat(kline[7]),
        numberOfTrades: kline[8],
        takerBuyBaseAssetVolume: parseFloat(kline[9]),
        takerBuyQuoteAssetVolume: parseFloat(kline[10]),
        ignore: kline[11],
      };
    });
  }
}
