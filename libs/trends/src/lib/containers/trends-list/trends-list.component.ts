import { Component, OnInit, Input } from '@angular/core';
import { Trend } from '@demo-app/data-models';

@Component({
  selector: 'demo-app-trends-list',
  templateUrl: './trends-list.component.html',
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent implements OnInit {
  @Input() trends: Trend[];

  ngOnInit(): void {
    console.log('works');
  }
}
