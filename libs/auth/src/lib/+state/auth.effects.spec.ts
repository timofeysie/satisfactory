import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { AuthEffects } from './auth.effects';
import { User } from '@demo-app/data-models';
import { Authenticate } from '@demo-app/data-models';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './../services/auth/auth.service';
import { of } from 'rxjs';
import * as authActions from './auth.actions';

const user: User = {
  username: 'duncan',
  id: 1,
  country: 'australia',
  token: '123',
  role: 'whatever',
};
class MockUserService {
  login() {
    return of(user);
    }
  }

describe('AuthEffects', () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let httpService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        AuthEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore({}),
        { provide: AuthService, useClass: MockUserService },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    httpService = TestBed.inject(AuthService);
  });

  describe('onFetchUsers$', () => void
    it('should fire if users is null', (done) => {
      const auth: Authenticate = {
        username: 'duncan',
        password: '123',
      };
      const spy = spyOn(httpService, 'login').and.callThrough();
      actions = of(authActions.login({ payload: auth }));
      effects.login$.subscribe((res) => {
        expect(res).toEqual(authActions.loginSuccess({ payload: user }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    })
  );
});
