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
    return new Promise((resolve) => {
    const results: Array<any> = new Array<any>();
    fs.readdir('./posts', (err, files) => {
      for (const [index, file] of files.entries()) {
        const fileName = file.substring(0, file.length - 5);
        const fileType = file.substring(file.lastIndexOf('.') + 1, file.length) ||
          file;
        if (fileType === 'json') {
          const entry = {
            id: index,
            name: fileName,
          };
          results.push(entry);
        }
      }
      resolve(results);
    });
  })
  }

  getCategory(category: string) {
    const filteredArray = productsArray.products.filter(function (item) {
      return item.category == category;
    });
    return filteredArray;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
