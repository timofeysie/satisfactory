import { Test, TestingModule } from '@nestjs/testing';
import { GanService } from './gan.service';

describe('GanService', () => {
  let service: GanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GanService],
    }).compile();

    service = module.get<GanService>(GanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
