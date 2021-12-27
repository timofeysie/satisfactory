import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TextService } from './text.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { GeneratorService } from '../../services/generator/generator/generator.service';
import * as fs from 'fs';

@Controller('text')
export class TextController {
  constructor(
    private readonly textService: TextService,
    private generatorService: GeneratorService
  ) {}

  @Post()
  create(@Body() createTextDto: CreateTextDto) {
    return this.textService.create(createTextDto);
  }

  @Get()
  findAll() {
    return this.textService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const promises = [];
    for (let offset = 0; offset < 14; offset++) {
      const results = this.textService.offsetSearch(id, offset);
      results.then((data) => {
        this.generatorService.setData(data);
      });
      promises.push(results);
    }
    return Promise.all(promises).then((values) => {
      const path = `./posts/${id}.txt`;
      const file = fs.createWriteStream(path);
      file.on('error', function (err) {
        /* error handling */
      });
      values.forEach((value) => {
        value.forEach((v) => {
          file.write(v + '\n');
        });
      });
      file.end();
      return values;
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextDto: UpdateTextDto) {
    return this.textService.update(+id, updateTextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textService.remove(+id);
  }
}
