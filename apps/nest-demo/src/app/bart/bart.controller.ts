import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BartService } from './bart.service';
import { CreateBartDto } from './dto/create-bart.dto';
import { UpdateBartDto } from './dto/update-bart.dto';

@Controller('bart')
export class BartController {
  constructor(private readonly bartService: BartService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bartService.findOne(id);
  }

  @Post()
  update(@Body() article: any) {
    return this.bartService.getArticleSummary(article.link);
  }
}
