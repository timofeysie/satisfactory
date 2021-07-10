import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsData } from './products.reducer';

const getProductsState = createFeatureSelector<ProductsData>('products');

const getProducts = createSelector(getProductsState, (state) => state.products);

export const productsQuery = {
  getProducts,
};
