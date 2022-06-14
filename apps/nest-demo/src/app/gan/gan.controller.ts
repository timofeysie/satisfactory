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
    const name = this.parsePath(linkWrapper.links);
    const pathToImage = 'dist/apps/public/' + name.filename;
    const response = await this.httpService.axiosRef({
      url: linkWrapper.links,
      method: 'GET',
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(pathToImage);
    response.data.pipe(writer);

    // The was the automatic image generation kickoff of any images in the download dir.
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve({ msg: 'download complete ' + name.filename }));
      writer.on('error', () => {
        console.log({err: 'gan.controller.downloadImage: error reject'});
        reject('Error in writing downloaded file ' + name.filename);
      });
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
  cleanUp() {
    return this.ganService.cleanUp();
  }

  @Get(':id')
  async upload(@Param('id') id: string) {
    const remove = id.split('(').join('%28');
    const brackets = remove.split(')').join('%29');
    const filename = brackets;
    const pathToImage = 'apps/toonify/src/cartooned_img/' + filename;
    return fs.readFile(pathToImage, (err, file) => {
      if (err) {
        console.log('gan.service.upload: err', err);
      }
      return this.ganService.uploadImage(file, id);
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGanDto: UpdateGanDto) {
    return this.ganService.kickOffGan();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ganService.remove(+id);
  }
}
