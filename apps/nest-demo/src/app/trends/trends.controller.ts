import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { CreateTrendDto } from './dto/create-trend.dto';
import { UpdateTrendDto } from './dto/update-trend.dto';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Post()
  create(@Body() createTrendDto: CreateTrendDto) {
    return this.trendsService.create(createTrendDto);
  }

  @Get()
  findAll() {
    return this.trendsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trendsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrendDto: UpdateTrendDto) {
    return this.trendsService.update(+id, updateTrendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trendsService.remove(+id);
  }
}
