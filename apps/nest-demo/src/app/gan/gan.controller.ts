import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GanService } from './gan.service';
import { CreateGanDto } from './dto/create-gan.dto';
import { UpdateGanDto } from './dto/update-gan.dto';

@Controller('gan')
export class GanController {
  constructor(private readonly ganService: GanService) {}

  @Post()
  create(@Body() createGanDto: CreateGanDto) {
    return this.ganService.create(createGanDto);
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
