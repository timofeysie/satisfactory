import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-app-trends-list-detail',
  templateUrl: './trends-list-detail.component.html',
  styleUrls: ['./trends-list-detail.component.scss'],
})
export class TrendsListDetailComponent {
  @Input() trendDetails: any;

  decode(input) {
    const txt = document.createElement('textarea');
    txt.innerHTML = input;
    return txt.value;
  }
}
