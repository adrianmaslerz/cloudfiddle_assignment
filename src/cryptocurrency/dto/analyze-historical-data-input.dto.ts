import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AnalyzeHistoricalDataInputDto {
  @IsString()
  symbol: string;

  @IsString()
  interval: string;

  @IsNumber()
  @IsOptional()
  limit?: string;

  @IsNumber()
  @IsOptional()
  startTime?: string;

  @IsNumber()
  @IsOptional()
  endTime?: string;
}
