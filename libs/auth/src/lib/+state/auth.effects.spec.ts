import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { AuthEffects } from './auth.effects';
import * as AuthActions from './auth.actions';
import { User } from '@demo-app/data-models';
import { Authenticate } from '@demo-app/data-models';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthEffects', () => {
  let actions: Observable<any>;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        AuthEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore({}),
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe('login$', () => {
    it('should work', () => {
      const auth: Authenticate = {
        username: 'zzz', password: 'xxx',
      };
      const user: User = {
        username: 'xxx', id: 1,
        country: 'aus', token: '123x', role: 'what',
      };
      actions = hot('-a-|', { a: AuthActions.login({ payload: auth }) });
      const expected = hot('-a-|', {
        a: AuthActions.loginSuccess({ payload: user}),
      });
      expect(effects.login$).toBeObservable(expected);
    });
  });
});
