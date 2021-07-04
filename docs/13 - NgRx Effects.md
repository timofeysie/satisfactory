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

### First up, the auth.reducer.spec.ts

Right at the top of the list, a tough one.

```txt
 FAIL   auth  libs/auth/src/lib/+state/auth.reducer.spec.ts
  ● Test suite failed to run
    libs/auth/src/lib/+state/auth.reducer.spec.ts:20:34 - error TS2339: Property 'loadAuthSuccess' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/angular/demo-app/libs/auth/src/lib/+state/auth.actions")'.
    20       const action = AuthActions.loadAuthSuccess({ auth });
```

This line in the spec needs to be updated:

```txt
const action = AuthActions.login({ auth });
```

Currently, there is this Typescript error:

Argument of type '{ auth: AuthEntity[]; }' is not assignable to parameter of type '{ payload: Authenticate; }'.

Object literal may only specify known properties, and 'auth' does not exist in type '{ payload: Authenticate; }'.ts(2345)
(property) auth: AuthEntity[]

The login component dispatches this action: authActions.login({ payload: authenticate })

The authenticate is typed, so we know what to change it to:

```js
export interface Authenticate {
  username: string;
  password: string;
}
```

Change the auth object to create the above and then updated the action payload:

```js
const action = AuthActions.login({ payload: auth });
```

And by the way, you can run a single test file like this:

```txt
nx test --test-file auth.reducer.spec.ts
```

There is still to go with this test, because the expectations don't match what we have.

```js
      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
```

We are relying on the Store here, but ngrx has mock store we should be using:

```js
import { provideMockStore } from '@ngrx/store/testing';
beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });
  });
```

You can define a specific state and pass it as method parameter.

But there is still more to go with the NgRx and the login.  Right now, let's just get the tests to pass and get on with steps 14 and 15, then come back then.

### The auth.effect.spec.ts test

Power to the people.  Next up.  
A similar situation with the reducer test, the effect also needs to use the actual objects being used.

There is no AuthActions.init() function.

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

I'm going to be honest here and admit I have never seen a test like this before:

```js
  describe('init$', () => {
    it('should work', () => {
      const auth: Authenticate = {
        username: 'zzz',
        password: 'xxx',
      };
      actions = hot('-a-|', { a: AuthActions.init() });
      const expected = hot('-a-|', {
        a: AuthActions.loginSuccess({ payload: auth}),
      });
      expect(effects.init$).toBeObservable(expected);
    });
  });
```

So this will be a learning experience for all of us.  First of all, we have no init$ effect.
But if we fix up the obvious errors, then the effects at the is undefined.  The createEffect function returns an Observable.   A hot Observable, to be exact.  So that seems like all this is testing.  Not a very meaningful test.  We should look at some other effect specs to figure out what is a decent thing to test.

After basic change our effects object is undefined.  This is being injected by the test bed, so not sure what to do about that either.

```js
  let effects: AuthEffects;
  beforeEach(() => {
    ...
    effects = TestBed.inject(AuthEffects);
```

### No provider errors

Moving on, the "No provider!" errors are a welcome relief as we know how to fix these.

```s
 FAIL   auth  libs/auth/src/lib/guards/auth/auth.guard.spec.ts (14.566 s)
  ● AuthGuard › should be created
    NullInjectorError: R3InjectorError(DynamicTestModule)[AuthGuard -> Router -> Router]:
      NullInjectorError: No provider for Router!
      at NullInjector.Object.<anonymous>.NullInjector.get (../../../packages/core/src/di/null_injector.ts:16:21)
```

For routing, and http, the test has to import special testing modules RouterTestingModule & HttpClientTestingModule.  It's a bit of a pain that it just can't just rely on the same as the component, but that's the kind of world we live in.

```shell
 FAIL   auth  libs/auth/src/lib/containers/login/login.component.spec.ts (14.536 s)
  ● LoginComponent › should create
    NullInjectorError: R3InjectorError(DynamicTestModule)[Store -> Store]:
      NullInjectorError: No provider for Store!
```

For Store, this is also a special case.

```js
import { provideMockStore } from '@ngrx/store/testing';
...
providers: [provideMockStore({})],
```

The next one, you might remember was because the 'submit' keyword was used for the output, and changing it to 'onSubmit' fixed the error.

```txt
 FAIL   auth  libs/auth/src/lib/components/login-form/login-form.component.spec.ts (15.661 s)
  ● LoginFormComponent › should create
    Found the synthetic property @transitionMessages. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.
      at checkNoSyntheticProp (../../../packages/platform-browser/src/dom/dom_renderer.ts:278:11)
```

The fix here is actually quite similar.  Change '(click)="login()"' to '(onClick)="login()"' and Bob is a very close family relative of yours.

The result in the reducer spec looks like this:

```txt
        ids: [],
        entities: {},
        action: {
          AuthActionTypes: {
            Login: '[Auth Page] Login',
            LoginSuccess: '[Auth API] Login Success',
            LoginFail: '[Auth API] Login Fail'
          },
          login: [Function (anonymous)],
          loginSuccess: [Function (anonymous)],
          loginFailure: [Function (anonymous)]
        },
        loaded: false,
        loading: true
```

We don't have a fully functioning login using NgRx yet, so as mentioned before, we will just get all the tests to pass now and come back later and make some meaningful login tests.  It would be nice to do some TDD here, but that would require already knowing well how to test NgRx features, which I'm still a bit weak at.  So leave that for later.

## Old notes on @Effect vs. createEffect()

Here are some notes from the clades project from the last time we got stuck on this section before.

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
