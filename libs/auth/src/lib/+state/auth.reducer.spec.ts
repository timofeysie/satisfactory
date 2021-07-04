import { TestBed, async } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthEntity } from './auth.models';
import * as AuthActions from './auth.actions';
import { State, initialState, reducer } from './auth.reducer';
import { Authenticate } from '@demo-app/data-models';

describe('Auth Reducer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });
  });

  const createAuthEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AuthEntity);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {});

  describe('valid Auth actions', () => {
    it('loadAuthSuccess should return set the list of known Auth', () => {
      const auth: Authenticate = {
        username: 'zzz',
        password: 'xxx',
      };
      const action = AuthActions.login({ payload: auth });
      const result: State = reducer(initialState, action);
      console.log('result-----------------', result);
      expect(result.loaded).toBe(false);
    });
  });
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
