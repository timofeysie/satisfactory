import { TrendsEntity } from './trends.models';
import * as TrendsActions from './trends.actions';
import { State, initialState, reducer } from './trends.reducer';

describe('Trends Reducer', () => {
  const createTrendsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TrendsEntity);

  beforeEach(() => {});

  describe('valid Trends actions', () => {
    it('loadTrendsSuccess should return set the list of known Trends', () => {
      const trends = [
        createTrendsEntity('PRODUCT-AAA'),
        createTrendsEntity('PRODUCT-zzz'),
      ];
      const action = TrendsActions.loadTrendsSuccess({ trends });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
