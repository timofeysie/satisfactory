import { Module } from '@nestjs/common';
import { BartService } from './bart.service';
import { BartController } from './bart.controller';

@Module({
  controllers: [BartController],
  providers: [BartService]
})
export class BartModule {}
