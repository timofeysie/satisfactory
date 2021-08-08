import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TrendsActions from './trends.actions';
import { Trend } from '@demo-app/data-models';

export const TRENDS_FEATURE_KEY = 'trends';

export interface TrendsData extends EntityState<Trend> {
  selectedTrendsId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface TrendsState {
  readonly trends: TrendsData;
}

export interface State extends EntityState<Trend> {
  selectedTrendsId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface TrendsPartialState {
  readonly [TRENDS_FEATURE_KEY]: State;
}

export const trendsAdapter: EntityAdapter<Trend> = createEntityAdapter<Trend>();

export const initialState: State = trendsAdapter.getInitialState({
  error: '',
  selectedTrendsId: null,
  loading: false,
});

export const {
  selectIds: selectTrendsIds,

  selectEntities: selectTrendsEntities,

  selectAll: selectAllTrends,

  selectTotal: selectTrendsTotal,
} = trendsAdapter.getSelectors();

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

export const getSelectedTrendsId = (state: TrendsData) =>
  state.selectedTrendsId;
