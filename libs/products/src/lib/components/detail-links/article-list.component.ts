import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-app-detail-links',
  templateUrl: './detail-links.component.html',
  styleUrls: ['./detail-links.component.scss'],
})
export class DetailLinksComponent {
  @Input() selectedProduct: any;

  replaceNewlines(desc: string) {
    return desc.replace(/\n /g, '\n');
  }
}
