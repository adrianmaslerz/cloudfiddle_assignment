import { AnalysisDto } from './analysis.dto';

export class AnalyzeResponseDto {
  symbol: string;
  interval: string;
  candles: number;
  analysis: AnalysisDto;
}