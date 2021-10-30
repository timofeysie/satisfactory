import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'demo-app-trends-toolbar',
  templateUrl: './trends-toolbar.component.html',
  styleUrls: ['./trends-toolbar.component.scss'],
})
export class TrendsToolbarComponent {
  @Input() trendTitleSeen: string;
  @Output() handleBackToList = new EventEmitter<any>();
  @Output() handleShowForm = new EventEmitter<any>();
}
