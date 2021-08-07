import { TrendsEntity } from './trends.models';
import { State, trendsAdapter, initialState } from './trends.reducer';
import * as TrendsSelectors from './trends.selectors';

describe('Trends Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTrendsId = (it) => it['id'];
  const createTrendsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TrendsEntity);

  let state;

  beforeEach(() => {
    state = {
      trends: trendsAdapter.setAll(
        [
          createTrendsEntity('PRODUCT-AAA'),
          createTrendsEntity('PRODUCT-BBB'),
          createTrendsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Trends Selectors', () => {
    it('getAllTrends() should return the list of Trends', () => {
      const results = TrendsSelectors.getAllTrends(state);
      const selId = getTrendsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TrendsSelectors.getSelected(state);
      const selId = getTrendsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getTrendsLoaded() should return the current 'loaded' status", () => {
      const result = TrendsSelectors.getTrendsLoaded(state);

      expect(result).toBe(true);
    });

    it("getTrendsError() should return the current 'error' state", () => {
      const result = TrendsSelectors.getTrendsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
