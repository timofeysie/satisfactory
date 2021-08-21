import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import * as request from 'request';

@Injectable()
export class ImagesService {
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return 'findAll';
  }

  async offsetSearch(id: string, offset: number): Promise<any> {
    return new Promise((resolve) => {
      const info = this.getInfo(id, offset);
      request(info, function (error, response, body) {
        if (body) {
          const searchResponse = JSON.parse(body);
          let data = [];
          if (searchResponse.webPages) {
            for (let i = 0; i < searchResponse.webPages.value.length; ++i) {
              const webPage = searchResponse.webPages.value[i];
              const names = webPage.name.split('.');
              const snips = webPage.snippet.split('.');
              const result = [];
              names.forEach((name) => {
                if (name.length > 3 && (name.indexOf('@') == -1) && (name.indexOf(' ') !== -1)) {
                  result.push(name.trim());
                }
              });
              snips.forEach((snip) => {
                if (
                  snip.length > 3 &&
                  snip.indexOf('@') == -1 &&
                  snip.indexOf(' ') !== -1
                ) {
                  result.push(snip.trim());
                }
              });
              data = data.concat(...result);
            }
            resolve(data);
          }
        }
      });
    });
  }

  flatten(webPage: any) {
    const result = [];
    const names = webPage.name.split('.');
    const snips = webPage.snippet.split('.');
    names.forEach((name) => {
      if (name.length > 3) {
        result.push(name);
      }
    });
    snips.forEach((snip) => {
      if (snip.length > 3) {
        result.push(snip);
      }
    });
    return result;
  }

  getInfo(id: string, offset: number) {
    const subscriptionKey = process.env['trendGroupResourceSubscriptionKey'];
    const customConfigId = process.env['customConfigId'];
    const searchTerm = encodeURI(id);
    const info = {
      url:
        'https://api.bing.microsoft.com/v7.0/search?' +
        'q=' +
        searchTerm +
        '&customconfig=' +
        customConfigId +
        '&offset=' +
        offset,
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    };
    console.log('info', info.url);
    return info;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
