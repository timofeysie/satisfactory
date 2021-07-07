import { ProductsEntity } from './products.models';
import * as ProductsActions from './products.actions';
import { State, initialState, reducer } from './products.reducer';

describe('Products Reducer', () => {
  const createProductsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProductsEntity);

  beforeEach(() => {});

  describe('valid Products actions', () => {
    it('loadProductsSuccess should return set the list of known Products', () => {
      const products = [
        createProductsEntity('PRODUCT-AAA'),
        createProductsEntity('PRODUCT-zzz'),
      ];
      const action = ProductsActions.loadProductsSuccess({ products });

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
