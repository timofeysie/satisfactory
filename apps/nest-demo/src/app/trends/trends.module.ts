import { Module } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { TrendsController } from './trends.controller';
import { StoryService } from './story.service';

@Module({
  controllers: [TrendsController],
  providers: [TrendsService, StoryService],
})
export class TrendsModule {}
