import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trend } from '@demo-app/data-models';

@Component({
  selector: 'demo-app-trends-list',
  templateUrl: './trends-list.component.html',
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent {
  @Input() trends: Trend[];
  @Input() trendDetails: any;
  @Output() country = new EventEmitter<string>();
  @Output() trendSeen = new EventEmitter<string>();
  countries = [
    { value: 'US', label: 'US' },
    { value: 'AU', label: 'Australia' },
  ];

  onFilter(event: string) {
    this.country.emit(event);
  }

  seeTrend(trend: any): void {
    this.trendSeen.emit(trend);
  }

}
