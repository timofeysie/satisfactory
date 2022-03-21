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
  @Output() onUseLinkForSummary = new EventEmitter<string>();
  @Output() onCleanup = new EventEmitter<boolean>();
  @Output() onHandleDownloadArticleAction = new EventEmitter<string>();

  countries = [
    { value: 'US', label: 'US' },
    { value: 'AU', label: 'Australia' },
    { value: 'KR', label: 'South Korea' },
  ];

  onHandleUseLinkForSummary(event: any) {
    this.onUseLinkForSummary.emit(event);
  }

  onFilter(event: string) {
    this.country.emit(event);
  }

  seeTrend(trend: any): void {
    this.trendSeen.emit(trend);
  }

  cleanup(event: any) {
    this.onCleanup.emit(true);
  }

  onHandleDownloadArticle(event: any) {
    this.onHandleDownloadArticleAction.emit(event);
  }
}
