import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll().then((result) => {
      return result;
    });
  }

  @Get(':category')
  getCategory(@Param('category') id: string) {
    return this.productsService.getCategory(id);
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
