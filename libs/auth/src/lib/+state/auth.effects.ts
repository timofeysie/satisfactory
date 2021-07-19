import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { AuthActionTypes } from './auth.actions';
import * as AuthActions from './auth.actions';
import { AuthService } from './../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          map(
            (user) => ({ type: AuthActionTypes.LoginSuccess, payload: user }),
          ),
          catchError((error) => {
              return of(AuthActions.loginFailure(error))
            })
        )
      )
    )
  );

  navigateToProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        map((action: AuthActionTypes.LoginSuccess) => action),
        tap(() => this.router.navigate([`/products`]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
