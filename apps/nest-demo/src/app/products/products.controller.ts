import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    console.log('ProductsController.findAll');
    return this.productsService.findAll().then((result) => {
      return result;
    });
  }

  @Get(':category')
  getCategory(@Param('category') id: string) {
    if (id === 'generate') {
      console.log('ProductsController.getCategory no id');
      return this.productsService.generateList();
    } else if (id === 'save') {
      console.log('ProductsController.getCategory no id');
      // its already done in the above service call
      // return this.productsService.saveList();
    } else {
      console.log('ProductsController.getCategory', id);
      return this.productsService.getCategory(id);
    }
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateProduct: any) {
    return this.productsService.update(id, updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
