import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';
import productsArray from './products.json';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    console.log('findAll');
    return new Promise((resolve, reject) => {
      const results: Array<any> = new Array<any>();
      fs.readdir('./posts', (err, files) => {
        if (files) {
          for (const [index, file] of files.entries()) {
            const fileName = file.substring(0, file.length - 5);
            const fileType =
              file.substring(file.lastIndexOf('.') + 1, file.length) || file;
            if (fileType === 'json') {
              const entry = {
                id: index,
                name: fileName,
              };
              results.push(entry);
            }
          }
        } else {
          reject('ProductsService.findAll: no files ' + err.toString());
        }
        resolve(results);
      });
    });
  }

  getCategory(category: string) {
    console.log('getCategory');
    return new Promise((resolve, reject) => {
      fs.readFile('./posts/' + category, 'utf-8', (err, file) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(file));
      });
    });
  }

  loadList() {
    console.log('loadie');
    return new Promise((resolve, reject) => {
      const fileContents = fs.readFileSync('./articles/articles.json', 'utf-8');
      const jsonFile = JSON.parse(fileContents);
      resolve(jsonFile);
    });
  }

  update(id: string, updateProduct: any) {
    return new Promise((resolve) => {
      fs.writeFile('./posts/' + id, JSON.stringify(updateProduct), () => {
        resolve('OK');
      });
    });
  }

  /*
  * Generate a json response with a brief article of all posts.
  *
    "author": "Paprika",
    "altText": "Lukashenko's moustache.jpg",
    "imageSrc": "",
    "imageChosen": "Lukashenko%27s_moustache_Paprika.jpg",
    "srcset": "",
    "description": "",
    "metaDescription": "",
    "tags": "Lukashenko, Lukashenko's moustache",
    "source": "https://commons.wikimedia.org/wiki/File:Lukashenko%27s_moustache.jpg",
    "aspect": "landscape",
    "type": "AI",
    "commonImg": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Lukashenko%27s_moustache.jpg/268px-Lukashenko%27s_moustache.jpg\" data-src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Lukashenko%27s_moustache.jpg/268px-Lukashenko%27s_moustache.jpg\" alt=\"Lukashenko's moustache.jpg\" loading=\"lazy\" class=\"sd-image\" style=\"height: 100% !important; max-width: 600px !important; max-height: 403px;\">",
    "googleImg": "",
    "s3": {
      "Location": "https://one-public-bucket.s3.ap-southeast-2.amazonaws.com/Lukashenko%2527s_moustache-using-Evening_in_Florence_Augusto_Giacometti_(1909).png"
    }
                */
  generateList() {
    return new Promise((resolve, reject) => {
      fs.readdir('./posts', async (err, files) => {
        if (files) {
          const articles = [];
          for (const [index, file] of files.entries()) {
            const fileName = file.substring(0, file.length - 5);
            const fileType =
              file.substring(file.lastIndexOf('.') + 1, file.length) || file;
            if (fileType === 'json') {
              console.log('filename', fileName);
              const fileContents = fs.readFileSync('./posts/' + file, 'utf-8');
              const jsonFile = JSON.parse(fileContents);
              let metaDesc = jsonFile['metaDescription'];
              const descLen = metaDesc.length;
              if (descLen > 156) {
                metaDesc = metaDesc.substring(0, 152) + '...';
              }
              const article = {
                title: jsonFile['pageTitle'],
                timeAgo: '10m ago',
                source: 'AIvsArt',
                image: {
                  newsUrl: 'https://www.aivsart.com/' + jsonFile['pageTitle'],
                  source: jsonFile['one']['author'],
                  imageUrl: jsonFile['one']['s3']
                    ? jsonFile['one']['s3']['Location']
                    : '',
                },
                url: 'https://www.aivsart.com',
                snippet: metaDesc,
                date: jsonFile['date'],
                category: jsonFile['category']
              };
              articles.push(article);
            }
          }
          console.log('articles', articles.length);
          this.saveFile(articles);
          resolve(articles);
        } else {
          reject('ProductsService.findAll: no files ' + err.toString());
        }
      });
    });
  }

  saveFile(articles: any) {
    const jsonString = JSON.stringify(articles);
    fs.writeFile('./articles.json', jsonString, (err) => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  }

  createArticle(file: any) {
    const article = {};
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
