import { Module, HttpModule } from '@nestjs/common';
import { GanService } from './gan.service';
import { GanController } from './gan.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [GanController],
  providers: [GanService],
  imports: [HttpModule, ConfigModule],
})
export class GanModule {}
