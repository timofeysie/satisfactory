import { createAction, props } from '@ngrx/store';
import { Trend } from '@demo-app/data-models';

export enum TrendsActionTypes {
  LoadTrends = '[Trends Page] Load Trends',
  LoadTrendsSuccess = '[Trends API] Load Trends Success',
  LoadTrendsFail = '[Trends API] LoadTrends Fail',
  LoadTrendImages = '[Trends Page] Load Trend Images',
  LoadTrendImagesSuccess = '[Trends API] Load Trend Images Success',
  LoadTrendImagesFail = '[Trends API] LoadTrend Images Fail',
}

/** Google Trend actions */
export const loadTrends = createAction(
  TrendsActionTypes.LoadTrends,
  props<{ payload: string }>()
);

export const loadTrendsSuccess = createAction(
  TrendsActionTypes.LoadTrendsSuccess,
  props<{ payload: Trend[] }>()
);

export const loadTrendsFailure = createAction(
   TrendsActionTypes.LoadTrendsFail,
  props<{ error: any }>()
);

/** Trend Images from a Wikimedia commons search */
export const loadTrendImages = createAction(
  TrendsActionTypes.LoadTrendImages,
  props<{ payload: string }>()
);

export const loadTrendsSuccesImages = createAction(
  TrendsActionTypes.LoadTrendImagesSuccess,
  props<{ payload: string[] }>()
);

export const loadTrendImagesFailure = createAction(
  TrendsActionTypes.LoadTrendImagesFail,
  props<{ error: any }>()
);