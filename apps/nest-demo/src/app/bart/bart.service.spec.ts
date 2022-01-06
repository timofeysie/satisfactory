import { Test, TestingModule } from '@nestjs/testing';
import { BartService } from './bart.service';

describe('BartService', () => {
  let service: BartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BartService],
    }).compile();

    service = module.get<BartService>(BartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
