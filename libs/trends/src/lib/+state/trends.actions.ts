import { createAction, props } from '@ngrx/store';
import { Trend } from '@demo-app/data-models';

export enum TrendsActionTypes {
  LoadTrends = '[Trends Page] Load Trends',
  LoadTrendsSuccess = '[Trends API] Load Trends Success',
  LoadTrendsFail = '[Trends API] LoadTrends Fail',
}

export const loadTrends = createAction(TrendsActionTypes.LoadTrends);

export const loadTrendsSuccess = createAction(
  TrendsActionTypes.LoadTrendsSuccess,
  props<{ payload: Trend[] }>()
);

export const loadTrendsFailure = createAction(
  TrendsActionTypes.LoadTrendsFail,
  props<{ error: any }>()
);
