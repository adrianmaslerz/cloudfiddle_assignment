import { AnalysisStatus } from './analysis-status.enum';

export class AnalysisDto {
  firstClose: number;
  lastClose: number;
  changePercent: number;
  status: AnalysisStatus;
}