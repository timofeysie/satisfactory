import { Module } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { TrendsController } from './trends.controller';

@Module({
  controllers: [TrendsController],
  providers: [TrendsService]
})
export class TrendsModule {}
