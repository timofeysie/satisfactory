import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  selectedTrends$: Observable<Trend>;

  constructor(private store: Store<TrendsState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(TrendsActions.loadTrends());
    this.trends$ = this.store.pipe(select(trendsQuery.getTrends));
    this.selectedTrends$ = this.store.pipe(
      select(trendsQuery.getSelectedTrends)
    );
  }

  updateUrlFilters(category: string): void {
    const navigationExtras: NavigationExtras = {
      replaceUrl: true,
      queryParams: { category },
    };
    this.router.navigate([`/trends`], navigationExtras);
  }
}
