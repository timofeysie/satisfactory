import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrendsData } from './trends.reducer';

const getTrendsState = createFeatureSelector<TrendsData>('trends');

const getTrends = createSelector(getTrendsState, (state) => state.trends);

export const trendsQuery = {
  getTrends,
};
