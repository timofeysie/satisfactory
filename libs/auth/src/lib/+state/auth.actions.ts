import { createAction, props } from '@ngrx/store';
import { Authenticate, User } from '@demo-app/data-models';

export enum AuthActionTypes {
  Login = '[Auth Page] Login',
  LoginSuccess = '[Auth API] Login Success',
  LoginFail = '[Auth API] Login Fail',
}

export const login = createAction(
  AuthActionTypes.Login,
  props<{ payload: Authenticate }>()
);

export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ payload: User }>()
);

export const loginFailure = createAction(
  AuthActionTypes.LoginFail,
  props<{ payload: any }>()
);
