import { Test, TestingModule } from '@nestjs/testing';
import { TextController } from './text.controller';
import { TextService } from './text.service';

describe('TextController', () => {
  let controller: TextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextController],
      providers: [TextService],
    }).compile();

    controller = module.get<TextController>(TextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
