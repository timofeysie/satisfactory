import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import request from 'request';
import { JSDOM } from 'jsdom';

@Injectable()
export class ImagesService {
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return 'ImagesService.findAll';
  }

  findOne(id: string) {
    return `This action returns a #${id} image`;
  }

  async search(searchString: string): Promise<any> {
    const fullUrl = this.getInfo(searchString);
    console.log('ImagesService.fullUrl', fullUrl);
    return new Promise((resolve, reject) => {
      request(fullUrl, function (error, response, body) {
        if (error) {
          reject(error);
        }
        const doc = new JSDOM(body).window.document;
        const listClass = 'sdms-image-result';
        const list: HTMLCollectionOf<Element> = doc.getElementsByClassName(
          listClass
        );
        const result = [];
        for(const item of Object.keys(list)) {
          result.push(list[item].innerHTML.toString().trim());
        }
        console.log('list', result.length);
        resolve(result);
      });
    });
  }

  getInfo(searchString: string) {
    const baseUrl = 'https://commons.wikimedia.org/w/index.php?search=';
    const params = '&title=Special:MediaSearch&go=Go';
    const fullUrl = baseUrl + encodeURI(searchString) + params;
    return fullUrl;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
