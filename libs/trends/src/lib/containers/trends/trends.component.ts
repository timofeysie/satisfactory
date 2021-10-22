import { Component, OnInit } from '@angular/core';
import { TrendsState } from './../../+state/trends.reducer';
import { Store, select } from '@ngrx/store';
import { trendsQuery } from './../../+state/trends.selectors';
import { Observable } from 'rxjs';
import { Trend } from '@demo-app/data-models';
import * as TrendsActions from '../../+state/trends.actions';
import { TrendsService } from '../../services/trends/trends.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'demo-app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
})
export class TrendsComponent implements OnInit {
  trends$: Observable<Trend[]>;
  commonImages: string[];
  constructor(
    private store: Store<TrendsState>,
    private trendsService: TrendsService
  ) {}

  ngOnInit() {
    this.store.dispatch(TrendsActions.loadTrends({ payload: 'US' }));
    this.trends$ = this.store.pipe(select(trendsQuery.getTrends));
  }

  onTrendSeen(trendTitleQuery: string) {
    console.log('trend.title.query', trendTitleQuery);
    this.trendsService.getCommonsImages(trendTitleQuery).subscribe((result) => {
      this.commonImages = result;
    });
  }

  updateCountry(category: any): void {
    this.store.dispatch(TrendsActions.loadTrends({ payload: category }));
  }
}
