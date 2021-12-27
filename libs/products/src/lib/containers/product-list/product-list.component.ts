import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@demo-app/data-models';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'demo-app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input() products: Product[];
  @Output() filter = new EventEmitter<string>();
  selectedProduct: any;

  constructor(private productsService: ProductsService) {
    console.log('not empty');
  }

  onFilter(category: string) {
    this.filter.emit(category);
  }

  onProductSelected(product) {
    console.log('got', product);
    this.productsService.getProducts(product.name + '.json').subscribe((result) => {
      this.selectedProduct = result;
    });
  }
}
