import { Test, TestingModule } from '@nestjs/testing';
import { GanController } from './gan.controller';
import { GanService } from './gan.service';

describe('GanController', () => {
  let controller: GanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GanController],
      providers: [GanService],
    }).compile();

    controller = module.get<GanController>(GanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
