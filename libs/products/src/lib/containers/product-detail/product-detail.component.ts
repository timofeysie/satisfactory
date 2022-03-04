import { Component, Output, Input, EventEmitter } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'demo-app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  @Input() selectedProduct: any;
  @Output() edit = new EventEmitter<boolean>();
  @Output() left = new EventEmitter<boolean>();
  @Output() right = new EventEmitter<boolean>();
  @Output() exit = new EventEmitter<boolean>();
  faEdit = faEdit;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faUndo = faUndo;

  onEdit() {
    this.edit.emit(true);
  }

  onLeft() {
    this.left.emit(true);
  }

  onRight() {
    this.right.emit(true);
  }

  replaceNewlines(desc: string) {
    return desc.replace(/\n /g, '\n');
  }
}
