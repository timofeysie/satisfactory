import { Component, OnInit } from '@angular/core';
import { ProductsState } from './../../+state/products.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '@demo-app/data-models';
import * as ProductsActions from '../../+state/products.actions';
import { productsQuery } from '../../+state/products.selectors';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'demo-app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<ProductsState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts());
    this.products$ = this.store.pipe(select(productsQuery.getProducts));
    this.selectedProduct$ = this.store.pipe(
      select(productsQuery.getSelectedProduct)
    );
  }

  updateUrlFilters(category: string): void {
    console.log('country', category)
    const navigationExtras: NavigationExtras = {
      replaceUrl: true,
      queryParams: { category },
    };
    // this.router.navigate([`/products`], navigationExtras);
  }
}
