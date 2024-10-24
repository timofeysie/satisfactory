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
  @Output() handleUseLinkForSummary = new EventEmitter<string>();
  @Output() onCleanup = new EventEmitter<boolean>();
  @Output() onHandleDownloadArticleAction = new EventEmitter<string>();
  searchText: string;
  mode: string;
  countries = [
    { value: 'US', label: 'US' },
    { value: 'AU', label: 'Australia' },
    { value: 'KR', label: 'South Korea' },
  ];

  goForIt() {
    console.log('goForIt', this.searchText);
    const custom = {
      title: {
        query: this.searchText,
        exploreLink: '',
      },
      formattedTraffic: '',
      relatedQueries: [],
      image: {
        newsUrl: 'https://en.wikipedia.org/wiki/' + this.searchText,
        source: 'Wikipedia',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/a/ab/Wikipedia-logo-pdc.pngg',
      },
      articles: [
        {
          image: {
            newsUrl: 'https://en.wikipedia.org/wiki/' + this.searchText,
            source: 'Wikipedia',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/a/ab/Wikipedia-logo-pdc.png',
          },
          snippet: 'on Wikipedia',
          source: 'Wikipedia',
          timeAgo: '',
          title: this.searchText,
          url: 'https://en.wikipedia.org/wiki/' + this.searchText,
        },
      ],
      shareUrl: 'https://en.wikipedia.org/wiki/' + this.searchText
    };
    this.seeTrend(custom);
  }

  onHandleUseLinkForSummary(event: any) {
    this.handleUseLinkForSummary.emit(event);
  }

  onFilter(event: string) {
    this.country.emit(event);
  }

  seeTrend(trend: any): void {
    console.log('trend', trend);
    this.trendSeen.emit(trend);
  }

  cleanup(event: any) {
    this.onCleanup.emit(true);
  }

  onHandleDownloadArticle(event: any) {
    this.onHandleDownloadArticleAction.emit(event);
  }
}
