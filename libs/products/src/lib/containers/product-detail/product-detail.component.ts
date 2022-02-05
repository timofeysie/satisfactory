import { Component, Output, Input, EventEmitter } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'demo-app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  @Input() selectedProduct: any;
  @Output() edit = new EventEmitter<boolean>();
  faEdit = faEdit;

  onEdit() {
    this.edit.emit(true);
  }

  replaceNewlines(desc: string) {
    return desc.replace(/\n /g, '\n');
  }
}
