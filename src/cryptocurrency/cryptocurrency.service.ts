import { Injectable } from '@nestjs/common';
import { BinanceService } from '../binance/binance.service';
import { AnalyzeResponseDto } from './dto/analyze-response.dto';
import { AnalyzeHistoricalDataInputDto } from './dto/analyze-historical-data-input.dto';
import { KlineInterface } from '../binance/kline.interface';
import { AnalysisDto } from './dto/analysis.dto';
import { AnalysisStatus } from './dto/analysis-status.enum';

@Injectable()
export class CryptocurrencyService {
  constructor(private readonly binanceService: BinanceService) {}

  public async analyzeHistoricalData(
    input: AnalyzeHistoricalDataInputDto,
  ): Promise<AnalyzeResponseDto> {
    const { symbol, interval, startTime, endTime } = input;

    const historicalData = await this.binanceService.getHistoricalDataForSymbol(
      symbol,
      interval,
      startTime,
      endTime,
    );

    const analysisResult = this.analyzeKlineData(historicalData);

    return {
      symbol,
      interval,
      candles: historicalData.length,
      analysis: analysisResult,
    };
  }

  public analyzeKlineData(data: KlineInterface[]): AnalysisDto {
    if (!data || data.length === 0) {
      return {
        firstClose: 0,
        lastClose: 0,
        changePercent: 0,
        status: AnalysisStatus.NO_CHANGE,
      };
    }

    const firstClose = data[0].close;
    const lastClose = data[data.length - 1].close;
    const changePercent = ((lastClose - firstClose) / firstClose) * 100;
    const status = this.determineStatus(changePercent);

    return {
      firstClose,
      lastClose,
      changePercent,
      status,
    };
  }

  private determineStatus(changePercent: number): AnalysisStatus {
    if (changePercent > 0) {
      return AnalysisStatus.INCREASE;
    } else if (changePercent < -1) {
      return AnalysisStatus.DECREASE;
    } else {
      return AnalysisStatus.NO_CHANGE;
    }
  }
}
