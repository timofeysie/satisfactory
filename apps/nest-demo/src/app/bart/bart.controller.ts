import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BartService } from './bart.service';

@Controller('bart')
export class BartController {
  constructor(private readonly bartService: BartService) {}

  @Get()
  findAll() {
    console.log('bart.controller.findAll');
    return this.bartService.loadSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('bart.controller.findOne: got id', id);
    return this.bartService.loadSummaryById(id);
  }

  @Post()
  async getArticleSummary(@Body() article: any) {
    console.log('bart.controller.getArticleSummary: article', article);
    return new Promise((resolve) => {
      this.bartService.getArticleSummary(article.link).then((result: any) => {
        resolve(encodeURIComponent(result));
      });
    }).catch((err) => {
      const buf = Buffer.from(err);
      console.log('controller err', buf.toString());
      throw new HttpException('buf.toString()', HttpStatus.ACCEPTED);
    });
  }
}
