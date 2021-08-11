import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
//import * as dotenv from 'dotenv';
import * as request from 'request';

@Injectable()
export class ImagesService {
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return 'findAll';
  }

  findOne(id: string) {
    const subscriptionKey = process.env['subscriptionKey'];
    const customConfigId = process.env['customConfigId'];
    const searchTerm = encodeURI(id);
    const info = {
      url:
        'https://api.bing.microsoft.com/v7.0/custom/search?' +
        'q=' +
        searchTerm +
        '&' +
        'customconfig=' +
        customConfigId,
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    };
    console.log('info', info);
    return new Promise((resolve) => {
      request(info, function (error, response, body) {
        const searchResponse = JSON.parse(body);
        if (searchResponse.webPages) {
          for (let i = 0; i < searchResponse.webPages.value.length; ++i) {
            const webPage = searchResponse.webPages.value[i];
            console.log('name: ' + webPage.name + ' ' + webPage.snippet);
          }
          resolve(searchResponse);
        } else {
          return resolve(error);
        }
      });
    });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
