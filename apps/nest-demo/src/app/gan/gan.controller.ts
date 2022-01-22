import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpService,
} from '@nestjs/common';
import { GanService } from './gan.service';
import { UpdateGanDto } from './dto/update-gan.dto';
import * as fs from 'fs';

@Controller('gan')
export class GanController {
  constructor(
    private readonly httpService: HttpService,
    private readonly ganService: GanService
  ) {}

  @Post()
  async downloadImage(@Body() linkWrapper: any) {
    const name = this.parsePath(linkWrapper.links[0]);
    console.log('gan.controller: downloadImage', name);
    const writer = fs.createWriteStream('apps/toonify/src/test_img/'+name.filename);
    const response = await this.httpService.axiosRef({
      url: linkWrapper.links[0],
      method: 'GET',
      responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }

  parsePath = (path) => {
    const regexPath = /^(?<path>(.*[\\/])?)(?<filename>.*)$/;
    const match = regexPath.exec(path);
    if (path && match) {
      return {
        path: match.groups.path,
        filename: match.groups.filename,
      };
    }
    throw Error('Error parsing path');
  };

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
