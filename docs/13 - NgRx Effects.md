# Using createEffect

The Effect decorator (@Effect) is deprecated in favor for the createEffect method. See the docs for more info https://ngrx.io/guide/migration/v11#the-effect-decorator.

BEFORE:

```js
@Effect()
login$ = this.actions$.pipe(...);
```

AFTER:

```js
login$ = createEffect(() => {
  return this.actions$.pipe(...);
});
```

The old effect from the workshop:

```js
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    mergeMap((action: authActions.Login) =>
      this.authService
        .login(action.payload)
        .pipe(
          map((user: User) => new authActions.LoginSuccess(user)),
          catchError(error => of(new authActions.LoginFail(error)))
        )
    )
  );
  ...
```

So then our new effect using createEffect should look like this:

```js
  login$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    mergeMap((action: authActions.Login) =>
      this.authService
        .login(action.payload)
        .pipe(
          map((user: User) => new authActions.LoginSuccess(user)),
          catchError(error => of(new authActions.LoginFail(error)))
        )
    )
  );
});
```

Only that has all kinds of errors on it.

The link in the deprecated message says you can do this:

```txt
ng generate @ngrx/schematics:create-effect-migration
```

Worth a shot.  But the message says: *The generate command requires to be run in an Angular project, but a project definition could not be found.*

On a hunch I tried this and it works:

```txt
> nx generate @ngrx/schematics:create-effect-migration
"SchematicsNgRxCreateEffectMigration" schema is using ...
```

The effect now looks like this:

```js
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    fetch({
      run: (action) => {
        this.authService.login(action);
      },
      onError: (action, error) => {
        return AuthActions.loginFailure(error);
      },
    })
  ));
```

There we go with the fetch() being used again.  Duncan questioned that usage before.  But if the cli is using it, then I think it has to stay.

A schematic is a great way to automatically update code using the cli.

## Fixing the unit tests

Testing auth shows quite a few errors after the above work.

```txt
nx test auth
...
Test Suites: 5 failed, 2 passed, 7 total
Tests:       3 failed, 5 passed, 8 total
```

Here they are:

```txt
 FAIL   auth  libs/auth/src/lib/+state/auth.reducer.spec.ts
  ● Test suite failed to run
    libs/auth/src/lib/+state/auth.reducer.spec.ts:20:34 - error TS2339: Property 'loadAuthSuccess' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/angular/demo-app/libs/auth/src/lib/+state/auth.actions")'.
    20       const action = AuthActions.loadAuthSuccess({ auth });
```

```txt
 FAIL   auth  libs/auth/src/lib/+state/auth.effects.spec.ts
  ● Test suite failed to run
    libs/auth/src/lib/+state/auth.effects.spec.ts:34:46 - error TS2339: Property 'init' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/angular/demo-app/libs/auth/src/lib/+state/auth.actions")'.
    34       actions = hot('-a-|', { a: AuthActions.init() });
                                                    ~~~~
    libs/auth/src/lib/+state/auth.effects.spec.ts:37:24 - error TS2339: Property 'loadAuthSuccess' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/angular/demo-app/libs/auth/src/lib/+state/auth.actions")'.
    37         a: AuthActions.loadAuthSuccess({ auth: [] }),
                              ~~~~~~~~~~~~~~~
    libs/auth/src/lib/+state/auth.effects.spec.ts:40:22 - error TS2339: Property 'init$' does not exist on type 'AuthEffects'.       
    40       expect(effects.init$).toBeObservable(expected);
                            ~~~~~
```

```txt
 FAIL   auth  libs/auth/src/lib/guards/auth/auth.guard.spec.ts (14.566 s)
  ● AuthGuard › should be created
    NullInjectorError: R3InjectorError(DynamicTestModule)[AuthGuard -> Router -> Router]:
      NullInjectorError: No provider for Router!
      at NullInjector.Object.<anonymous>.NullInjector.get (../../../packages/core/src/di/null_injector.ts:16:21)
```

```txt
 FAIL   auth  libs/auth/src/lib/containers/login/login.component.spec.ts (14.536 s)
  ● LoginComponent › should create
    NullInjectorError: R3InjectorError(DynamicTestModule)[Store -> Store]:
      NullInjectorError: No provider for Store!
```

```txt
 FAIL   auth  libs/auth/src/lib/components/login-form/login-form.component.spec.ts (15.661 s)
  ● LoginFormComponent › should create
    Found the synthetic property @transitionMessages. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.
      at checkNoSyntheticProp (../../../packages/platform-browser/src/dom/dom_renderer.ts:278:11)
```

## Old notes on @Effect vs. createEffect()

Here are some notes from the clades project from the last time we got stuck on this.

The automatically generated effects by Nrwl 9 use fetch:

```js
export class AuthEffects {
  loadAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuth),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AuthActions.loadAuthSuccess({ auth: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.loadAuthFailure({ error });
        }
      })
    )
  );
  ...
```

Pretty different.  Having trouble making an updated version.

There is no effect in the counter example from the stratum app.

The docs say *Effects decrease the responsibility of the component.*  I suppose the counter example has too little responsibility.  The official example [here] shows more like the old version:

```js
export class MovieEffects {
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Movies Page] Load Movies'),
    mergeMap(() => this.moviesService.getAll()
      .pipe(
        map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
```

The reducer code is fleshed out [in the next part, titled "13 - NgRx Effects"](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/13-ngrx-effects).

The reducer shown here has four parts:

```js
interface AuthData { }
export interface AuthState { }
export const initialState: AuthData = { }
export function authReducer( )
```

Using the action the old way looks like this in the login.component.ts:

```js
this.store.dispatch(new authActions.Login(authenticate));
```

The new way of doing things looks like this:

```js
this.store.dispatch(login({ payload: authenticate }));
```

Then we have a problem of how to do things in the effect:

```js
.login(action.payload)
              ^^^^^^^
Property 'payload' does not exist on type 'AuthActionTypes.Login'.ts(2339)
```

Updating the first effect, this is looking good in that there are no TS errors:

```js
@Effect() login$ = this.actions$.pipe(
  ofType(AuthActionTypes.Login),
  fetch({
    run: action => {
      this.authService
      .login(action)
    },
    onError: (action, error) => {
      console.error('Error', error);
      return AuthActions.loginFailure(error);
    }
  })
);
```

However, will the login action get the user object as happens in the map function of the old workshop code?

```js
map((user: User) => new authActions.LoginSuccess(user)),
```

Compared to the old way of doing this, ```mergeMap((action: authActions.Login)``` is replaced by the shorter ```run: action```.

The second one will need more work.  The workshop code shows:

```js
@Effect({ dispatch: false }) navigateToProfile$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: authActions.LoginSuccess) => action.payload),
    tap(() => this.router.navigate([`/products`]))
  );
```
