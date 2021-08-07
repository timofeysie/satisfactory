import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { TrendsEffects } from './trends.effects';
import * as TrendsActions from './trends.actions';

describe('TrendsEffects', () => {
  let actions: Observable<any>;
  let effects: TrendsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TrendsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TrendsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TrendsActions.init() });

      const expected = hot('-a-|', {
        a: TrendsActions.loadTrendsSuccess({ trends: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
