import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-app-trends-list-detail',
  templateUrl: './trends-list-detail.component.html',
  styleUrls: ['./trends-list-detail.component.scss'],
})
export class TrendsListDetailComponent {
  @Input() trendDetails: any;
  @Output() handleUseLinkForSummary = new EventEmitter<string>();

  decode(input) {
    const txt = document.createElement('textarea');
    txt.innerHTML = input;
    return txt.value;
  }

  onUseLink(event, url) {
    if (event.checked === true) {
      this.handleUseLinkForSummary.emit(url)
    }
  }
}
