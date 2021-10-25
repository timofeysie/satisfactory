import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-app-trends-list-detail',
  templateUrl: './trends-list-detail.component.html',
  styleUrls: ['./trends-list-detail.component.scss'],
})
export class TrendsListDetailComponent {
  @Input() trendDetails: any;
}
