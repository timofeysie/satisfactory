import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'demo-app-trends-list-detail',
  templateUrl: './trends-list-detail.component.html',
  styleUrls: ['./trends-list-detail.component.scss'],
})
export class TrendsListDetailComponent {
  @Input() trendDetails: any;
  @Output() handleUseLinkForSummary = new EventEmitter<string>();
  @Output() handleDownloadArticle = new EventEmitter<string>();
  faCloudDownloadAlt = faCloudDownloadAlt;

  decode(input) {
    const txt = document.createElement('textarea');
    txt.innerHTML = input;
    return txt.value;
  }

  onUseLink(event, url) {
    if (event.checked === true) {
      this.handleUseLinkForSummary.emit(url);
    }
  }

  onDownloadArticle(event) {
    this.handleDownloadArticle.emit(event);
  }
}
