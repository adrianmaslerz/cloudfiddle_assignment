import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AnalyzeHistoricalDataInputDto {
  @IsString()
  symbol: string;

  @IsString()
  interval: string;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  startTime?: number;

  @IsNumber()
  @IsOptional()
  endTime?: number;
}
