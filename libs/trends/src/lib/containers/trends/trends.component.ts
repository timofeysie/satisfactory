import { Component, OnInit } from '@angular/core';
import { TrendsState } from './../../+state/trends.reducer';
import { Store, select } from '@ngrx/store';
import { trendsQuery } from './../../+state/trends.selectors';
import { Observable } from 'rxjs';
import { Trend } from '@demo-app/data-models';
import * as TrendsActions from '../../+state/trends.actions';
@Component({
  selector: 'demo-app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
})
export class TrendsComponent implements OnInit {
  trends$: Observable<Trend[]>;

  constructor(private store: Store<TrendsState>) {}

  ngOnInit() {
    this.store.dispatch(TrendsActions.loadTrends({payload: 'US'}));
    this.trends$ = this.store.pipe(select(trendsQuery.getTrends));
  }

  updateCountry(category: any): void {
    console.log('cat', category);
    this.store.dispatch(TrendsActions.loadTrends({payload: category}));
  }
}
