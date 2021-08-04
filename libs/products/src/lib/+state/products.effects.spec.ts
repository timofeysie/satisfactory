import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { ProductsActionTypes } from './../+state/products.actions';
import { ProductsEffects } from './products.effects';
import * as ProductsActions from './products.actions';
import { Product } from '@demo-app/data-models';

describe('ProductsEffects', () => {
  let actions: Observable<any>;
  let effects: ProductsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ProductsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ProductsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProductsActionTypes.Init });
      const expected = hot('-a-|', {
        a: ProductsActions.loadProductsSuccess({ payload: [] }),
      });
      expect(effects.init$).toBeObservable(expected);
    });
  });
});
