import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-app-trends-list-detail',
  templateUrl: './trends-list-detail.component.html',
  styleUrls: ['./trends-list-detail.component.scss'],
})
export class TrendsListDetailComponent {
  @Input() trendDetails: any;
  @Output() backToList = new EventEmitter<any>();

  handleBackToList() {
    this.backToList.emit();
  }
}
