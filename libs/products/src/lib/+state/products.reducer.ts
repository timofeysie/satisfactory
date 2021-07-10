import { createReducer, on } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { ProductsEntity } from './products.models';
import * as ProductsActions from './products.actions';
import { Product } from '@demo-app/data-models';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProdcutsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export interface State extends EntityState<ProductsEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

/**
 * Interface for the 'Products' data used in
 *  - ProductsState, and
 *  - productsReducer
 */
export interface ProductsData {
  loading: boolean;
  products: Product[];
  error: '';
}

/**
 * Interface to the part of the Store containing ProductsState
 * and other information related to ProductsData.
 */
export interface ProductsState {
  readonly products: ProductsData;
}

export const initialState: ProductsData = {
  loading: false,
  products: [],
  error: '',
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { payload: products }) => ({
    ...state, 
    payload: products,
    loaded: true
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
