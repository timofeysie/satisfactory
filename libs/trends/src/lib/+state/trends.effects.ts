import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TrendsService } from './../services/trends/trends.service';
import { TrendsActionTypes } from './../+state/trends.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as TrendsActions from './../+state/trends.actions';
import { of } from 'rxjs';
import { Trend } from '@demo-app/data-models';

@Injectable()
export class TrendsEffects {
  login$ = createEffect(() =>
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

  constructor(
    private actions$: Actions,
    private trendsService: TrendsService
  ) {}
}
