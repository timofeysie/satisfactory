import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { GeneratorService } from '../../services/generator/generator/generator.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, GeneratorService],
})
export class ImagesModule {}
