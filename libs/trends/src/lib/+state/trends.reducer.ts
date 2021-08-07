import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TrendsEntity } from './trends.models';
import * as TrendsActions from './trends.actions';
import { Trend } from '@demo-app/data-models';

export const TRENDS_FEATURE_KEY = 'trends';

export interface TrendsData {
  loading: boolean;
  trends: Trend[];
  error: '';
}

export interface TrendsState {
  readonly trends: TrendsData;
}

export interface State extends EntityState<TrendsEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface TrendsPartialState {
  readonly [TRENDS_FEATURE_KEY]: State;
}

export const trendsAdapter: EntityAdapter<TrendsEntity> = createEntityAdapter<TrendsEntity>();

export const initialState: State = trendsAdapter.getInitialState({
  action: TrendsActions,
  loaded: false,
});

export const trendsReducer = createReducer(
  initialState,
  on(TrendsActions.loadTrends, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TrendsActions.loadTrendsSuccess, (state, { payload: trends }) => ({
    ...state,
    trends: trends,
    loaded: true,
  })),
  on(TrendsActions.loadTrendsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return trendsReducer(state, action);
}
