# 19 - Fixing the unit tests.md

## Auth unit tests

```txt
> nx test auth
Test Suites: 3 failed, 4 passed, 7 total
Tests:       3 failed, 8 passed, 11 total
```

```txt
 FAIL   auth  libs/auth/src/lib/components/login-form/login-form.component.spec.ts (11.845 s)
  ● LoginFormComponent › should create
    Found the synthetic property @transitionMessages. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.
```

There is no @transitionMessages anywhere in the app.  What is it talking about?  It must be material design.  Adding BrowserAnimationsModule to the imports of the test only works to fix this.

```txt
 FAIL   auth  libs/auth/src/lib/services/auth/auth.service.spec.ts (10.837 s)
  ● AuthService › should be created
    NullInjectorError: R3InjectorError(DynamicTestModule)[AuthService -> Store -> Store]:
      NullInjectorError: No provider for Store!
```

This one is an easy fix:

```js
import { provideMockStore } from '@ngrx/store/testing';
...
providers: [provideMockStore({})],
```

```txt
 FAIL   auth  libs/auth/src/lib/+state/auth.effects.spec.ts (10.956 s)
  ● AuthEffects › login$ › should work
    expect(received).toEqual(expected) // deep equality
    - Expected  - 29
    + Received  +  1
```

Actually, I have no idea what that means, except the test is not working.  Login works, but the test fails.  Since this is a learning exercise, I will attempt to learn how to test an effect.

## Testing effects

Since the syntax in marble tests is atrocious, I'm going to look for more readable alternatives.

Here is a simple more readable way to test the effect.

Create a mock service, use a mock action and mock store and use a spy, then pat yourself on the back.

```js
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

  describe('onFetchUsers$', async () => {
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
    });
  });
});
```

I know.  I seems like kind of circular reasoning to test mocks and spies.  There is a small part of the effect being tested, and I suppose that is the point of a unit test.  More and more I think e2e tests are more valuable.

I don't know what this is talking about:

```txt
        ● Test suite failed to run

          A "describe" callback must not return a value.
          Returning a value from "describe" will fail the test in a future version of Jest.

            47 |   });
            48 |
          > 49 |   describe('onFetchUsers$', async () => void
               |   ^
            50 |     it('should fire if users is null', (done) => {
            51 |       const auth: Authenticate = {
            52 |         username: 'duncan',
```

Actually, removing the async fixes the issue.  Glad for that.  It's time to sleep like a baby.

## Fixing the layout tests

```txt
nx test layout --watch
  ● LayoutComponent › should create
    NullInjectorError: R3InjectorError(DynamicTestModule)[AuthService -> Store -> Store]:
      NullInjectorError: No provider for Store!
      at NullInjector.Object.<anonymous>.NullInjector.get (../../../packages/core/src/di/null_injector.ts:16:21)
      ...
  ● LayoutComponent › should create
    expect(received).toBeTruthy()
    Received: undefined
      22 |
      23 |   it('should create', () => {
    > 24 |     expect(component).toBeTruthy();
         |                       ^
      25 |   });
      26 | });
      27 |
      at src/lib/containers/layout/layout.component.spec.ts:24:23
...
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Same fix as in step 13: Import and provide the provideMockStore.

For Store, this is also a special case.

```js
import { provideMockStore } from '@ngrx/store/testing';
...
providers: [provideMockStore({})],
```

After this the single test passes.  This is all we need for the layout unit tests.  We will be updating the e2e tests to create more meaningful tests for the behavior of the app.

## Unit tests for Products

```txt
nx test products --watch
Test Suites: 5 failed, 1 passed, 6 total
Tests:       2 failed, 1 passed, 3 total
```

```txt
 FAIL   products  libs/products/src/lib/+state/products.reducer.spec.ts
  ● Test suite failed to run
    libs/products/src/lib/+state/products.reducer.spec.ts:20:60 - error TS2345: Argument of type '{ paylod: ProductsEntity[]; }' is not assignable to parameter of type '{ payload: Product[]; }'.
      Object literal may only specify known properties, but 'paylod' does not exist in type '{ payload: Product[]; }'. Did you mean to write 'payload'?
    20       const action = ProductsActions.loadProductsSuccess({ paylod: products });
    libs/products/src/lib/+state/products.reducer.spec.ts:24:21 - error TS2339: Property 'loaded' does not exist on type 'State'.    
    24       expect(result.loaded).toBe(true);
                           ~~~~~~
```

'paylod'?  It's not the only silly thing in the products.reducer.

```js
beforeEach(() => {});
```

Silly.

```txt
Type 'ProductsEntity[]' is not assignable to type 'Product[]'.
  Type 'ProductsEntity' is missing the following properties from type 'Product': name, categoryts(2322)
products.actions.ts(16, 11): The expected type comes from property 'payload' which is declared here on type '{ payload: Product[]; }'
```

```txt
 FAIL   products  libs/products/src/lib/+state/products.selectors.spec.ts
  ● Test suite failed to run
    libs/products/src/lib/+state/products.selectors.spec.ts:20:11 - error TS2739: Type 'ProductsEntity' is missing the following properties from type 'Product': name, category
    20           createProductsEntity('PRODUCT-AAA'),
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    libs/products/src/lib/+state/products.selectors.spec.ts:21:11 - error TS2322: Type 'ProductsEntity' is not assignable to type 'Product'.
    21           createProductsEntity('PRODUCT-BBB'),
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    libs/products/src/lib/+state/products.selectors.spec.ts:22:11 - error TS2322: Type 'ProductsEntity' is not assignable to type 'Product'.
    22           createProductsEntity('PRODUCT-CCC'),
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    libs/products/src/lib/+state/products.selectors.spec.ts:36:41 - error TS2339: Property 'getAllProducts' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/nx/nx-12-demo-app/libs/products/src/lib/+state/products.selectors")'.
    36       const results = ProductsSelectors.getAllProducts(state);
                                               ~~~~~~~~~~~~~~
    libs/products/src/lib/+state/products.selectors.spec.ts:44:40 - error TS2339: Property 'getSelected' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/nx/nx-12-demo-app/libs/products/src/lib/+state/products.selectors")'.
    44       const result = ProductsSelectors.getSelected(state);
                                              ~~~~~~~~~~~
    libs/products/src/lib/+state/products.selectors.spec.ts:51:40 - error TS2339: Property 'getProductsLoaded' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/nx/nx-12-demo-app/libs/products/src/lib/+state/products.selectors")'.
    51       const result = ProductsSelectors.getProductsLoaded(state);
    libs/products/src/lib/+state/products.selectors.spec.ts:57:40 - error TS2339: Property 'getProductsError' does not exist on type 
'typeof import("C:/Users/timof/repos/timofeysie/nx/nx-12-demo-app/libs/products/src/lib/+state/products.selectors")'.
    57       const result = ProductsSelectors.getProductsError(state);

 PASS   products  libs/products/src/lib/containers/product-list/product-list.component.spec.ts (7.414 s)
  ● Console
    console.error
      NG0304: 'mat-card' is not a known element:
      1. If 'mat-card' is an Angular component, then verify that it is part of this module.
      2. If 'mat-card' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress 
this message.
      at logUnknownElementError (../../../packages/core/src/render3/instructions/element.ts:220:15)
      ...
      at renderChildComponents (../../../packages/core/src/render3/instructions/shared.ts:123:5)
    console.error
      NG0304: 'mat-form-field' is not a known element:
      1. If 'mat-form-field' is an Angular component, then verify that it is part of this module.
      2. If 'mat-form-field' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
      at logUnknownElementError (../../../packages/core/src/render3/instructions/element.ts:220:15)
      ...
      at renderChildComponents (../../../packages/core/src/render3/instructions/shared.ts:123:5)
    console.error
      NG0304: 'mat-select' is not a known element:
      1. If 'mat-select' is an Angular component, then verify that it is part of this module.
      2. If 'mat-select' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
      at logUnknownElementError (../../../packages/core/src/render3/instructions/element.ts:220:15)
      ...
      at renderChildComponents (../../../packages/core/src/render3/instructions/shared.ts:123:5)
    console.error
      NG0304: 'mat-option' is not a known element:
      1. If 'mat-option' is an Angular component, then verify that it is part of this module.
      2. If 'mat-option' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
      at logUnknownElementError (../../../packages/core/src/render3/instructions/element.ts:220:15)
      ...
      at renderChildComponents (../../../packages/core/src/render3/instructions/shared.ts:123:5)
      NG0304: 'mat-option' is not a known element:
    console.error
      1. If 'mat-option' is an Angular component, then verify that it is part of this module.
      2. If 'mat-option' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
      at logUnknownElementError (../../../packages/core/src/render3/instructions/element.ts:220:15)
      ...
      at renderChildComponents (../../../packages/core/src/render3/instructions/shared.ts:123:5)
    console.error
      NG0304: 'mat-nav-list' is not a known element:
      1. If 'mat-nav-list' is an Angular component, then verify that it is part of this module.
      2. If 'mat-nav-list' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
      at logUnknownElementError (../../../packages/core/src/render3/instructions/element.ts:220:15)
      ...
      at renderChildComponents (../../../packages/core/src/render3/instructions/shared.ts:123:5)
      NG0303: Can't bind to 'value' since it isn't a known property of 'mat-option'.
    console.error
      at logUnknownPropertyError (../../../packages/core/src/render3/instructions/shared.ts:1127:11)
      ...
      at refreshChildComponents (../../../packages/core/src/render3/instructions/shared.ts:116:5)
    console.error
      NG0303: Can't bind to 'value' since it isn't a known property of 'mat-option'.
      at logUnknownPropertyError (../../../packages/core/src/render3/instructions/shared.ts:1127:11)
      ...
      at refreshChildComponents (../../../packages/core/src/render3/instructions/shared.ts:116:5)
```

### products.effects.spec.ts

As with the auth.effects, instead of using marbles, a more readable way to test the effect is the following.

1. create a mock service
2. use a mock action and mock store and use a spy
3. pat yourself on the back

Here are the errors with the current marble testing that we wont be fixing.

```txt
 FAIL   products  libs/products/src/lib/+state/products.effects.spec.ts
  ● Test suite failed to run
    libs/products/src/lib/+state/products.effects.spec.ts:34:50 - error TS2339: Property 'init' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/nx/nx-12-demo-app/libs/products/src/lib/+state/products.actions")'.
    34       actions = hot('-a-|', { a: ProductsActions.init() });
    libs/products/src/lib/+state/products.effects.spec.ts:37:50 - error TS2345: Argument of type '{ products: undefined[]; }' is not 
assignable to parameter of type '{ payload: Product[]; }'.
      Object literal may only specify known properties, and 'products' does not exist in type '{ payload: Product[]; }'.
    37         a: ProductsActions.loadProductsSuccess({ products: [] }),
    libs/products/src/lib/+state/products.effects.spec.ts:40:22 - error TS2339: Property 'init$' does not exist on type 'ProductsEffects'.
    40       expect(effects.init$).toBeObservable(expected);
                            ~~~~~
 FAIL   products  libs/products/src/lib/services/products/products.service.spec.ts
  ● ProductsService › should be created
    NullInjectorError: R3InjectorError(DynamicTestModule)[ProductsService -> HttpClient -> HttpClient]:
      NullInjectorError: No provider for HttpClient!
      at NullInjector.Object.<anonymous>.NullInjector.get (../../../packages/core/src/di/null_injector.ts:16:21)
      ...
      at Object.wrappedFunc (../../node_modules/zone.js/bundles/zone-testing-bundle.umd.js:4250:34)
  ● ProductsService › should be created
    expect(received).toBeTruthy()
    Received: undefined
      13 |   it('should be created', () => {
    > 14 |     expect(service).toBeTruthy();
         |                     ^
      15 |   });
      16 | });
      at src/lib/services/products/products.service.spec.ts:14:21
      ...
      <anonymous>.Zone.run (../../node_modules/zone.js/bundles/zone-testing-bundle.umd.js:167:47)
      at Object.wrappedFunc (../../node_modules/zone.js/bundles/zone-testing-bundle.umd.js:4250:34)
```

For completeness, here is what we will be replacing:

```js
  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProductsActions.init() });
      const expected = hot('-a-|', {
        a: ProductsActions.loadProductsSuccess({ products: [] }),
      });
      expect(effects.init$).toBeObservable(expected);
    });
  });
```

What we want to test is the loadFilteredProducts function.  I'm curious though, what is the init function that is not there anymore?  Worth looking into actually.  It would be good to understand what the scaffolding commands create out of the box for us, and then why we don't use them?

After all, much of the material in the course has gone out of date, so why not also some of the ways it refactors the default setup?

So this is in the product actions.  First, look for the cli command that created the default.  Then go back to the last commit before that, run it again and look at the output.

The command is run at the start of [15 - Add Products NgRx Feature Module](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/15-add-products-ngrx-feature-module).

So grab the state at the end of step 14 and run that command again and report back here.

Here is the initial action created:

```js
export const init = createAction('[Products Page] Init');
export const loadProductsSuccess = createAction(
  '[Products/API] Load Products Success',
  props<{ products: ProductsEntity[] }>()
);
export const loadProductsFailure = createAction(
  '[Products/API] Load Products Failure',
  props<{ error: any }>()
);
```

The init function is used in the effect like this:

```js
init$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.init),
    fetch({
      run: (action) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return ProductsActions.loadProductsSuccess({ products: [] });
      },

      onError: (action, error) => {
        console.error('Error', error);
        return ProductsActions.loadProductsFailure({ error });
      },
  })
)
```

Again with the fetch!  It's back to haunt us.  I know Duncan questioned the use here, but it's time to figure this out now.

For starters, trying to use that action and effect in the current code results in a big red error block with the message:

```txt
Type 'Observable<unknown>' is not assignable to type 'EffectResult<Action>'.
  Type 'Observable<unknown>' is not assignable to type 'Observable<Action>'.
    Property 'type' is missing in type '{}' but required in type 'Action'.ts(2322)
models.d.ts(2, 5): 'type' is declared here.
effect_creator.d.ts(42, 161): The expected type comes from the return type of this signature.
```

There are a bunch of quick fixes recommended for it, but none seem to work.

As an exercise, I decided to put the original init action back, and the the effect to use it, then see if I could get that test to pass.  Most of that is easy, but there is one error now.

In the test, this line is causing the following error:

```js
a: ProductsActions.loadProductsSuccess({ payload: Product[] }),
```

```txt
'Product' only refers to a type, but is being used as a value here.ts(2693)
Parsing error: An element access expression should take an argument.eslint
```

I've seen that error plenty of times: 'X" only refers to a type, but is being used as a value here.ts(2693)

But suprisingly, given all the notes for this project, there is no mention of it.  So will be good to get the solution on record.  A quick google of the second part of the error provided [the solution](https://stackoverflow.com/questions/52368118/an-element-access-expression-should-take-an-argument) to "An element access expression should take an argument.eslint", which is instead of using "Product []", just use "[]".

Try the tests again: nx test products

The effect has this error now:

```js
 FAIL   products  libs/products/src/lib/+state/products.effects.spec.ts
  ● Test suite failed to run
    libs/products/src/lib/+state/products.reducer.spec.ts:18:60 - error TS2322: Type 'ProductsEntity[]' is not assignable to type 'Product[]'.
      Type 'ProductsEntity' is missing the following properties from type 'Product': name, category
    18       const action = ProductsActions.loadProductsSuccess({ payload: products });
                                                                  ~~~~~~~
      libs/products/src/lib/+state/products.actions.ts:17:11
        17   props<{ payload: Product [] }>()
                     ~~~~~~~
        The expected type comes from property 'payload' which is declared here on type '{ payload: Product[]; }'      
    libs/products/src/lib/+state/products.reducer.spec.ts:22:21 - error TS2339: Property 'loaded' does not exist on type 'State'.
    22       expect(result.loaded).toBe(true);
                           ~~~~~~
```

So the ProductEntity needs to be involved here.  In step 16 I wrote: "This will be fixed in the next step, which is named 17 - Router Store for some reason.".  So the answer might be somewhere in step 17, but that's not very specific.  Time to get more specific with the answers to this question also.

Speaking of errors, when merging the work from this branch into master and coming back here, git had this to say:

```txt
PS C:\Users\timof\repos\timofeysie\nx\nx-12-demo-app> git checkout step-19-fixing-the-unit-tests
Switched to branch 'step-19-fixing-the-unit-tests'
Your branch is based on 'origin/step-19-fixing-the-unit-tests', but the upstream is gone.
  (use "git branch --unset-upstream" to fixup)
```

But actually, as I read that message, that branch is [still there](https://github.com/timofeysie/nx-12-demo-app/tree/step-19-fixing-the-unit-tests), so git my friend, what are you actually trying to say?

### The products.component.spec.ts unit test failures

```txt
 FAIL   products  libs/products/src/lib/containers/products/products.component.spec.ts
  ● ProductsComponent › should create
    NullInjectorError: R3InjectorError(DynamicTestModule)[Store -> Store]:
      NullInjectorError: No provider for Store!
      at NullInjector.Object.<anonymous>.NullInjector.get (../../../packages/core/src/di/null_injector.ts:16:21)
      ...
      at Object.wrappedFunc (../../node_modules/zone.js/bundles/zone-testing-bundle.umd.js:4250:34)
  ● ProductsComponent › should create
    expect(received).toBeTruthy()
    Received: undefined
      22 |   it('should create', () => {
    > 23 |     expect(component).toBeTruthy();
         |                       ^
      24 |   });
      25 | });
      at src/lib/containers/products/products.component.spec.ts:23:23
```

## What to do about the tests

Creating a branch: step-19-fixing-the-unit-tests is only the start.

It is missing this commit:

```txt
commit 0a10fcc8f6d86b95a967f21b6556a9391aa94c15 (HEAD -> master, origin/master, origin/HEAD, origin/18-Deploying-An-Nx-Monorepo, 18-Deploying-An-Nx-Monorepo)
Author: tim_curchod <timofeyc@hotmail.com>
Date:   Mon Jul 19 22:17:31 2021 +1000
    fixed the unit tests for auth
```

The earlier work on unit and e2e tests was put in additional files that do not show up in the workshop.  I was hoping Duncan would put them in or give some input on how he would want them included, but he can't provide that kind of help at this point.
