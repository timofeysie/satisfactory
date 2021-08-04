import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsData } from './products.reducer';
import * as fromProduct from './products.reducer';

const getProductsState = createFeatureSelector<ProductsData>('products');

const getProducts = createSelector(
  getProductsState,
  fromProduct.selectAllProducts
);
const getProductEntities = createSelector(
  getProductsState,
  fromProduct.selectProductEntities
);
const getSelectedProductId = createSelector(
  getProductsState,
  fromProduct.getSelectedProductId
);
const getSelectedProduct = createSelector(
  getProductEntities,
  getSelectedProductId,
  (productsDictionary, id) => {
    return productsDictionary[id];
  }
);

export const productsQuery = {
  getProducts,
  getProductEntities,
  getSelectedProductId,
  getSelectedProduct,
};
