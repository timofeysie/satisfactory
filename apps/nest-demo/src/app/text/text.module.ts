import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { GeneratorService } from '../../services/generator/generator/generator.service';

@Module({
  controllers: [TextController],
  providers: [TextService, GeneratorService],
})
export class TextModule {}
