import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { GeneratorService } from '../../services/generator/generator/generator.service';
import * as fs from 'fs';
@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private generatorService: GeneratorService
  ) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const promises = [];
    for (let offset = 0; offset < 15; offset++) {
      const results = this.imagesService.offsetSearch(id, offset);
      results.then((data) => {
        this.generatorService.setData(data);
      });
      promises.push(results);
    }
    Promise.all(promises).then((values) => {
      console.log('promises', values);
      const file = fs.createWriteStream('array.txt');
      file.on('error', function (err) {
        /* error handling */
      });
      values.forEach((value) => {
        value.forEach((v) => {
        file.write(v + '\n');
      });
    });
      file.end();
      return values
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
