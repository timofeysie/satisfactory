import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BartService } from './bart.service';
import { CreateBartDto } from './dto/create-bart.dto';
import { UpdateBartDto } from './dto/update-bart.dto';

@Controller('bart')
export class BartController {
  constructor(private readonly bartService: BartService) {}

  @Get()
  findAll() {
    return this.bartService.loadSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bartService.findOne(id);
  }

  @Post()
  async getArticleSummary(@Body() article: any) {
    return new Promise((resolve) => {
      this.bartService.getArticleSummary(article.link).then((result) => {
        console.log('getArticleSummary resolve result', result);
        resolve(result);
      });
    }).catch((err) => {
      const buf = Buffer.from(err);
      console.log('controller err', buf.toString());
    });
  }
}
