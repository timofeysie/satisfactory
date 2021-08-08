import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrendsData } from './trends.reducer';
import * as fromTrends from './trends.reducer';

const getTrendsState = createFeatureSelector<TrendsData>('trends');

const getTrends = createSelector(
  getTrendsState,
  fromTrends.selectAllTrends
);
const getTrendsEntities = createSelector(
  getTrendsState,
  fromTrends.selectTrendsEntities
);
const getSelectedTrendsId = createSelector(
  getTrendsState,
  fromTrends.getSelectedTrendsId
);
const getSelectedTrends = createSelector(
  getTrendsEntities,
  getSelectedTrendsId,
  (trendsDictionary, id) => {
    return trendsDictionary[id];
  }
);

export const trendsQuery = {
  getTrends,
  getTrendsEntities,
  getSelectedTrendsId,
  getSelectedTrends,
};
