import { Injectable } from '@nestjs/common';
import { BinanceService } from '../binance/binance.service';
import { AnalyzeResponseDto } from './dto/analyze-response.dto';
import { AnalyzeHistoricalDataInputDto } from './dto/analyze-historical-data-input.dto';

@Injectable()
export class CryptocurrencyService {
  constructor(private readonly binanceService: BinanceService) {}

  public async analyzeHistoricalData(
    input: AnalyzeHistoricalDataInputDto,
  ): Promise<AnalyzeResponseDto> {
    return {} as any;
  }
}
