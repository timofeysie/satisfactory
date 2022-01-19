import { Module, HttpModule } from '@nestjs/common';
import { GanService } from './gan.service';
import { GanController } from './gan.controller';

@Module({
  controllers: [GanController],
  providers: [GanService],
  imports: [HttpModule],
})
export class GanModule {}
