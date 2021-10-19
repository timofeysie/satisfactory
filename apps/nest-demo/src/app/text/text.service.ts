import { Injectable } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import * as request from 'request';

function include(name: string) {
  if (
    name.indexOf('Mobile is the official app') === -1 &&
    name.indexOf('Mobile keeps you connected') === -1 &&
    name.indexOf('Google') === -1 &&
    name.indexOf('Read more') === -1 &&
    name.indexOf('Collapse') === -1
  ) {
    return true;
  } else {
    return false;
  }
}

@Injectable()
export class TextService {
  create(createTextDto: CreateTextDto) {
    return 'This action adds a new text';
  }

  findAll() {
    return `This action returns all text`;
  }

  findOne(id: number) {
    return `This action returns a #${id} text`;
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
                if (
                  name.length > 3 &&
                  name.indexOf('@') == -1 &&
                  name.indexOf(' ') !== -1 &&
                  include(name)
                ) {
                  result.push(name.trim());
                }
              });
              snips.forEach((snip) => {
                if (
                  snip.length > 3 &&
                  snip.indexOf('@') == -1 &&
                  snip.indexOf(' ') !== -1 &&
                  include(snip)
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

  update(id: number, updateTextDto: UpdateTextDto) {
    return `This action updates a #${id} text`;
  }

  remove(id: number) {
    return `This action removes a #${id} text`;
  }
}
