import { createAction, props } from '@ngrx/store';

export enum ProductsActionTypes {
  LoadProducts = '[Products Page] Load Products',
  LoadProductsSuccess = '[Products API] Load Products Success',
  LoadProductsFail = '[Products API] LoadProducts Fail',
}

export const loadProducts = createAction(
  ProductsActionTypes.LoadProducts,
  props<any>()
);

export const loadProductsSuccess = createAction(
  ProductsActionTypes.LoadProductsSuccess,
  props<{ payload: any }>()
);

export const loadProductsFail = createAction(
  ProductsActionTypes.LoadProductsFail,
  props<{ payload: any }>()
);
