import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TrendsService } from './../services/trends/trends.service';
import { TrendsActionTypes } from './../+state/trends.actions';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import * as TrendsActions from './../+state/trends.actions';
import { of } from 'rxjs';
import { Trend } from '@demo-app/data-models';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';


@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrendsActionTypes.LoadTrends),
      mergeMap(() =>
        this.trendsService.getTrends().pipe(
          map((trends: Trend[]) =>
            TrendsActions.loadTrendsSuccess({ payload: trends })
          ),
          catchError((error) => of(TrendsActions.loadTrendsFailure({ error })))
        )
      )
    )
  );

  loadFilteredTrends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.startsWith('/trends')
      ),
      map(
        (r: RouterNavigationAction) =>
          r.payload.routerState.root.queryParams['category']
      ),
      mergeMap((category: string) =>
        this.trendsService.getTrends().pipe(
          map((trends: Trend[]) =>
            TrendsActions.loadTrendsSuccess({ payload: trends })
          ),
          catchError((error) => of(TrendsActions.loadTrendsFailure(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private trendsService: TrendsService
  ) {}
}
