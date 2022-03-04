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
  selectedProductIndex: any;
  selectedProductName: string;
  editMode = false;
  countries = [
    { value: 'US', label: 'US' },
    { value: 'AU', label: 'Australia' },
    { value: 'KR', label: 'South Korea' },
  ];

  constructor(private productsService: ProductsService) {}

  onSaveDetails(data: any) {
    this.selectedProduct = null;
    this.editMode = false;
    this.productsService
      .updateProducts(this.selectedProductName, data)
      .subscribe(() => {
        this.onProductSelected(this.selectedProduct, this.selectedProductIndex);
      });
  }

  onExit(event) {
    console.log('event', event);
    this.selectedProduct = null;
    this.editMode = false;
  }

  /**
   * Take all the posts and create a list of articles out of them.
   * They look like this:
   * "articles": [
      {
        "title": "Bryan Harsin...",
        "timeAgo": "53m ago",
        "source": "CalBearsMaven",
        "image": {
          "newsUrl": "https://www.si.com/...",
          "source": "CalBearsMaven",
          "imageUrl": "https://t2.gstatic..."
        },
        "url": "https://www.si.com/colle...",
        "snippet": "Tigers football pla..."
      },
   */
  onGenerateList() {
    console.log('ya~');
    this.productsService.generateProductList().subscribe((result) => {
      console.log('result', result);
    })
  }

  onEditDetail() {
    this.editMode = !this.editMode;
  }

  onFilter(category: string) {
    this.filter.emit(category);
  }

  onProductSelected(product, index) {
    this.editMode = false;
    this.selectedProductName = product.name + '.json';
    this.selectedProductIndex = index;
    this.productsService
      .getProducts(this.selectedProductName)
      .subscribe((result) => {
        this.selectedProduct = result;
      });
  }

  onNavigateLeft(event) {
    let previousIndex = this.selectedProductIndex - 1;
    if (previousIndex < 0) {
      previousIndex = this.products.length - 1;
    }
    const previousProduct = this.products[previousIndex];
    this.onProductSelected(previousProduct, previousIndex);
  }

  onNavigateRight(event) {
    let nextIndex = this.selectedProductIndex + 1;
    if (nextIndex >= this.products.length) {
      nextIndex = 0;
    }
    const nextProduct = this.products[nextIndex];
    this.onProductSelected(nextProduct, nextIndex);
  }
}
