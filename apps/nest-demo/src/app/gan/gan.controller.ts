import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GanService } from './gan.service';
import { CreateGanDto } from './dto/create-gan.dto';
import { UpdateGanDto } from './dto/update-gan.dto';

import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('gan')
export class GanController {
  constructor(private readonly ganService: GanService) {}

  @Post()
  async downloadImage(@Body() linkWrapper: any) {
    console.log('gan.controller: downloadImage');
    return new Promise((resolve) => {
      this.ganService.downloadImage(linkWrapper.links);
      resolve('OK');
    }).catch((err) => {
      console.log('controller err', err);
    });
  }

  @Get()
  findAll() {
    return this.ganService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ganService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGanDto: UpdateGanDto) {
    return this.ganService.update(+id, updateGanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ganService.remove(+id);
  }
}
