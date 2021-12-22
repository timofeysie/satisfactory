import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'demo-app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  @Input() selectedProduct: any;

}
