import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll().then((result) => {
      return result;
    });
  }

  @Get(':category')
  getCategory(@Param('category') id: string) {
    console.log('category', id);
    return this.productsService.getCategory(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduct: any) {
    console.log('patch', id);
    return this.productsService.update(id, updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
