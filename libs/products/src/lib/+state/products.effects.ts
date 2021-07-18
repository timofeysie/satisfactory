import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from './../services/products/products.service';
import { ProductsActionTypes } from './../+state/products.actions';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import * as ProductActions from './../+state/products.actions';
import { of } from 'rxjs';

import { Product } from '@demo-app/data-models';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class ProductsEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionTypes.LoadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products: Product[]) =>
            ProductActions.loadProductsSuccess({ payload: products })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  
  loadFilteredProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((r: RouterNavigationAction) =>
      r.payload.routerState.url.startsWith('/products')
    ),
    map(
      (r: RouterNavigationAction) =>
        r.payload.routerState.root.queryParams['category']
    ),
    mergeMap((category: string) =>
      this.productService.getProducts(category).pipe(
        map(
          (products: Product[]) =>
            ProductActions.loadProductsSuccess({ payload: products })
        ),
        catchError((error) => of(ProductActions.loadProductsFailure(error)))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}
}
