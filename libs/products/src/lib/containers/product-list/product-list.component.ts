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
  selectedProductName: string;
  editMode = false;

  constructor(private productsService: ProductsService) {}

  onSaveDetails(data: any) {
    this.selectedProduct = data;
    this.editMode = false;
    this.productsService
      .updateProducts(this.selectedProductName, data)
      .subscribe(() => {
        this.onProductSelected(this.selectedProduct);
      });
  }

  onEditDetail() {
    this.editMode = !this.editMode;
  }

  onFilter(category: string) {
    this.filter.emit(category);
  }

  onProductSelected(product) {
    this.editMode = false;
    this.selectedProductName = product.name + '.json';
    this.productsService
      .getProducts(this.selectedProductName)
      .subscribe((result) => {
        this.selectedProduct = result;
      });
  }
}
