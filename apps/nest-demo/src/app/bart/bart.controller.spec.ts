import { Test, TestingModule } from '@nestjs/testing';
import { BartController } from './bart.controller';
import { BartService } from './bart.service';

describe('BartController', () => {
  let controller: BartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BartController],
      providers: [BartService],
    }).compile();

    controller = module.get<BartController>(BartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
