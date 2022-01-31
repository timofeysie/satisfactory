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
import { ConfigService } from '@nestjs/config';

@Controller('gan')
export class GanController {
  constructor(
    private readonly httpService: HttpService,
    private readonly ganService: GanService,
    private readonly configService: ConfigService
  ) {}

  @Post()
  async downloadImage(@Body() linkWrapper: any) {
    const name = this.parsePath(linkWrapper.links[0]);
    console.log('gan.controller: downloadImage', name);
    const pathToImage = 'apps/toonify/src/test_img/' + name.filename;
    const writer = fs.createWriteStream(pathToImage);
    const response = await this.httpService.axiosRef({
      url: linkWrapper.links[0],
      method: 'GET',
      responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => this.ganService.kickOffGan());
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
  async upload(@Param('id') id: string) {
    const remove = id.split('(').join('%28');
    const brackets = remove.split(')').join('%29');
    const filename = brackets;
    console.log('===== gan.service.upload: encodeURI(id)', filename);
    const pathToImage = 'apps/toonify/src/cartooned_img/' + filename;
    return fs.readFile(pathToImage, (err, file) => {
      console.log('gan.service.upload: err', err);
      return this.ganService.uploadImage(file, id);
    });
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
