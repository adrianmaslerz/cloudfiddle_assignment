import { Controller, Get, Query, Req } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { AnalyzeHistoricalDataInputDto } from './dto/analyze-historical-data-input.dto';
import { AnalyzeResponseDto } from './dto/analyze-response.dto';

@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Get('historical/analyze')
  public async analyzeHistorical(
    @Query() input: AnalyzeHistoricalDataInputDto,
  ): Promise<AnalyzeResponseDto> {
    return this.cryptocurrencyService.analyzeHistoricalData(input);
  }
}
