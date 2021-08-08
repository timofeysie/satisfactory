import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trend } from '@demo-app/data-models';

@Component({
  selector: 'demo-app-trends-list',
  templateUrl: './trends-list.component.html',
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent {
  @Input() trends: Trend[];
  @Output() filter = new EventEmitter<string>();
  
  onFilter(category: string) {
    this.filter.emit(category);
  }
}
