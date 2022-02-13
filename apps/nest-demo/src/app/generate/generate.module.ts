import { Module } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { GenerateController } from './generate.controller';

@Module({
  controllers: [GenerateController],
  providers: [GenerateService]
})
export class GenerateModule {}
