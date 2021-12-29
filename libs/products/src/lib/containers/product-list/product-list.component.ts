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
  editMode = false;

  constructor(private productsService: ProductsService) {}

  onSaveDetails() {
    console.log('called');
    this.editMode = false;
  }

  onEditDetail() {
    this.editMode = !this.editMode;
  }

  onFilter(category: string) {
    this.filter.emit(category);
  }

  onProductSelected(product) {
    this.editMode = false;
    this.productsService
      .getProducts(product.name + '.json')
      .subscribe((result) => {
        this.selectedProduct = result;
      });
  }
}
