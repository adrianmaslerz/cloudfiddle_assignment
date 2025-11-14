import { Test, TestingModule } from '@nestjs/testing';
import { BinanceService } from './binance.service';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('BinanceService', () => {
  let service: BinanceService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule.register({})],
      providers: [BinanceService],
    }).compile();

    service = module.get<BinanceService>(BinanceService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
