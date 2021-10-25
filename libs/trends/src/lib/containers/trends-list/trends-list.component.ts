import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trend } from '@demo-app/data-models';

@Component({
  selector: 'demo-app-trends-list',
  templateUrl: './trends-list.component.html',
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent {
  @Input() trends: Trend[];
  @Output() country = new EventEmitter<string>();
  @Output() trendSeen = new EventEmitter<string>();
  trendDetails: any;
  countries = [
    { value: 'US', label: 'US' },
    { value: 'AU', label: 'Australia' },
  ];

  onFilter(event: string) {
    this.country.emit(event);
  }

  seeTrend(trend: any): void {
    this.trendSeen.emit(trend.title.query);
    console.log('trend selected', trend);
    this.trendDetails = trend;
  }

  backToList() {
    this.trendDetails = null;
  }
}
