# 15 - Add Products NgRx Feature Module

The old scaffolding command:

```txt
ng generate ngrx products --module=libs/products/src/lib/products.module.ts
```

The new scaffolding command:

```txt
nx g @nrwl/angular:ngrx --module=libs/products/src/lib/products.module.ts --minimal false
```

An old action:

```js
export class LoadProducts implements Action {
  readonly type = ProductsActionTypes.LoadProducts;
}
```

A new action:

```js
export const loadProductsSuccess = createAction(
  '[Products/API] Load Products Success',
  props<{ products: ProductsEntity[] }>()
);
```

In section 13, a helpful link in a deprecated message showed this for migrating an effect:

```txt
ng generate @ngrx/schematics:create-effect-migration
```

Maybe we can do the same for an action?

```txt
>ng generate @ngrx/schematics:create-action-migration
The generate command requires to be run in an Angular project, but a project definition could not be found.
```

There are a few differences with the payload which will need to be sorted out:

```js
export class LoadProducts implements Action {
  readonly type = ProductsActionTypes.LoadProducts;
}
export class LoadProductsSuccess implements Action {
  readonly type = ProductsActionTypes.LoadProductsSuccess;
  constructor(public payload: any) {} --> props<{ products: ProductsEntity[] }>()
}

export class LoadProductsFail implements Action {
  readonly type = ProductsActionTypes.LoadProductsFail;
  constructor(public payload: any) {} --> props<{ products: ProductsEntity[] }>()
}
```

Not sure why we would need this in product.action.ts, but I think this section hasn't been updated in a while:

```js
import * as ProductsActions from './products.actions';
```

It might be required in a later step.

## 5. Make new ProductsService in products module

Old command:

```txt
ng g service services/products/products --project=products
```

New command:

```txt
nx generate @nrwl/angular:service services/products/products --module=libs/products/src/lib/products.module.ts
'module' is not found in schema
```

The module exists, but the module flag doesn't.

Without module, it creates the service in the customer portal app, which is not where we want it.  How was the auth service generated?

```txt
nx generate @nrwl/angular:service services/auth/auth
```

I notice in part five, we have this:

```txt
>nx generate @nrwl/angular:service services/auth/auth
CREATE apps/customer-portal/src/app/services/auth/auth.service.spec.ts
CREATE apps/customer-portal/src/app/services/auth/auth.service.ts
```

Yet this is the path to the current service:

libs\auth\src\lib\services\auth\auth.service.ts

Did I move that?  What should I use?

nx generate @nrwl/angular:service services/products/products

nx generate @nrwl/angular:service --project=services/products/products

```txt
> nx generate @nrwl/angular:service --project=services/products/products --dry-run
√ What name would you like to use for the service? · products
Error: Specified project does not exist.
    at Object.createDefaultPath (C:\Users\timof\repos\timofeysie\nx\nx-12-demo-app\node_modules\@schematics\angular\utility\workspace.js:71:15)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async C:\Users\timof\repos\timofeysie\nx\nx-12-demo-app\node_modules\@schematics\angular\service\index.js:18:28
Specified project does not exist.
```

This works:

```txt
>nx generate @nrwl/angular:service --project=products
√ What name would you like to use for the service? · products
CREATE libs/products/src/lib/products.service.spec.ts
CREATE libs/products/src/lib/products.service.ts
```

Not quite.  It needs to be in a services directory.  Try answering the question with this:

services/products/products

Yep.  That works.

```txt
>nx generate @nrwl/angular:service --project=products
√ What name would you like to use for the service? · services/products/products
CREATE libs/products/src/lib/products.service.spec.ts
CREATE libs/products/src/lib/products.service.ts
```

### 6. Add effect

I ran the migration schematic on the app again to convert the effect to the new format.  Got to love those schematics!  

```txt
nx generate @ngrx/schematics:create-effect-migration
```

The original effect:

```js
  @Effect()
  login$ = this.actions$.pipe(
    ofType(ProductsActionTypes.LoadProducts),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map(
          (products: Product[]) =>
            ProductActions.loadProductsSuccess({ payload: products })
        ),
        catchError((error) => of(ProductActions.loadProductsFail({ payload: error })))
      )
    )
  );
```

The new product effect:

```js
  login$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActionTypes.LoadProducts),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map(
          (products: Product[]) =>
            ProductActions.loadProductsSuccess({ payload: products })
        ),
        catchError((error) => of(ProductActions.loadProductsFail({ payload: error })))
      )
    )
  ));
```

### 7. Add reducer logic

The reducer has an issue.

```js
export function productsReducer(
  state = initialState,
  action: ProductsActions
): ProductsData {
```

Cannot find name 'ProductsActions'.ts(2304)
Parameter 'action' of exported function has or is using private name 'ProductsActions'.ts(4078)

Never dealt with that error before.  One answer is to export it inside module declaration.

I'm not sure what the best solution is here.  For now, 'any' will do.  The whole reducer needs to be migrated to the latest version.

An old reducer uses a switch statement.  The new style uses 'on'.

Here is the example [from the current docs](https://ngrx.io/guide/store/reducers):

```js
const scoreboardReducer = createReducer(
  initialState,
  on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
  on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
  on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
  on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
);
```

A new reducer might look like this:

```js
export const productsReducer = createReducer(
  initialState,
  on (ProductsActionTypes.LoadProducts, state => ({ 
    ...state, 
    loading: true })),
  on (ProductsActionTypes.LoadProductsSuccess , state => ({ 
    ...state, 
    products: action.payload, 
    loading: false, 
    error: '' })),
  on (ProductsActionTypes.LoadProductsFail, state => ({ 
    ...state,
    products: null,
    loading: false,
    error: action.payload,
    }))
);
```

But the whole block is one big squiggly red TypeScript error:

```txt
Argument of type 
'ReducerTypes<ProductsData, readonly ActionCreator<string, Creator<any[], object>>[]>' is not assignable to parameter of type 
'ReducerTypes<ProductsData, ActionCreator<string, Creator<any[], object>>[]>'.
  Types of property 'types' are incompatible.
    The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.ts(2345)
(alias) on<ProductsData, readonly ActionCreator<string, Creator<any[], object>>[]>(
  ...args: [...creators: ActionCreator<string, Creator<any[], object>>[], 
  reducer: OnReducer<...>]): ReducerTypes<...>
import on
@description
Associates actions with a given state change function. A state change function must be provided as the last parameter.
@param args — ActionCreator's followed by a state change function.
@returns — an association of action types with a state change function.
@usageNotes
on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user }))
```

Why is ActionCreator readonly?

```ts
ReducerTypes<ProductsData, readonly ActionCreator<string, Creator<any[], object>>[]>
ReducerTypes<ProductsData, ActionCreator<string, Creator<any[], object>>[]>
```

The state is the second argument, right?  Shouldn't the state be read only?  Only saying.

The [Clades [project reduce](https://github.com/timofeysie/clades/blob/master/libs/products/src/lib/%2Bstate/products.reducer.ts) contains a working example, but it includes the adaptor which is added in the next step.  We still need to show this step without that adapter.

This is causing no errors, so give it a try and complete the step to see how it works:

```js
export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { payload: products }) => ({
    ...state, 
    payload: products,
    loaded: true
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
```

There are no errors until the app is run:

```shell
Error: libs/products/src/lib/products.module.ts:15:20 - error TS2339: Property 'PRODUCTS_FEATURE_KEY' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/nx/nx-12-demo-app/libs/products/src/lib/+state/products.reducer")'.

15       fromProducts.PRODUCTS_FEATURE_KEY,
                      ~~~~~~~~~~~~~~~~~~~~
Error: libs/products/src/lib/products.module.ts:16:20 - error TS2339: Property 'reducer' does not exist on type 'typeof import("C:/Users/timof/repos/timofeysie/nx/nx-12-demo-app/libs/products/src/lib/+state/products.reducer")'.

16       fromProducts.reducer
                      ~~~~~~~
Error: The loader "C:/Users/timof/repos/timofeysie/nx/nx-12-demo-app/libs/products/src/lib/containers/products/products.component.css" didn't return a string.
```

There is no fromProducts in the reducer:

```js
import * as fromProducts from './+state/products.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent }]),
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
```

This was automatically generated.  So what should it be?

I don't get it.  The Auth module also shows a fromAuth import, but there is no fromAuth in the auth.reducer.  So how come that doesn't throw an error?

I'm now changing my mind about getting rid of step 14.  Although it's kind of the chicken before the egg, it is needed for this step.

We should go back and updated that step with the code added here, as there are a few minor changes.

Also, we will need to add the libs\products\src\lib\products.module.ts to step 15.

But, also, now the errors are gone, the login is doing nothing.  I thought we just fixed that?

I mean, there was no change to the auth after it was working.  Add some logging, and then this error:

```txt
core.js:6456 ERROR TypeError: Cannot read property 'products' of undefined
    at products.selectors.ts:6
```

So that's a problem.  Line 6 is:

```js
const getProducts = createSelector(getProductsState, (state) => state.products);
```

Well, it should be empty at least, and not an error.  But there are products in the db.json file.  And actually there are returned in the network request for http://localhost:3000/products.

So we're getting close here.  In the redux dev tools, I can see the products in the payload.

Oh.  The products feature key still said 'auth'.  Now, no error, but there is an empty array on the products page.  A little bit closer.

There are two parts missing from the boiler plate heaved reducer.  If we look at the complete auth reducer, it has these features:

https://github.com/timofeysie/nx-12-demo-app/blob/master/libs/auth/src/lib/%2Bstate/auth.reducer.ts 

```js
export const AUTH_FEATURE_KEY = 'auth'; 
export interface AuthData { }
export interface AuthState { }
export interface State extends EntityState<
> { }
export interface AuthPartialState { }
export const authAdapter: EntityAdapter<AuthEntity> = createEntityAdapter<AuthEntity>();
export const initialState: State = authAdapter.getInitialState({ });
const authReducer = createReducer( );
export function reducer(state: State | undefined, action: Action) { }
```

See what I mean about boiler plate?  That's nine separate plates to boil.

In case anyone is wondering what the auth entity is, it looks like this:

```js
export interface AuthEntity {
  id: string | number; // Primary ID
}
```

For products to catch up to that we need a productsAdapter and need to export the function reducer as is done in the auth reducer.

After adding those two, there is an error in the productsReducer state arg.

```js
export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
```

```txt
Argument of type 'State' is not assignable to parameter of type 'ProductsData'.
  Type 'State' is missing the following properties from type 'ProductsData': loading, products.ts(2345)
(parameter) state: State
```

The initial state was all messed up.  Looking at the auth initial state helped clear that up:

```js
export const initialState: State = productsAdapter.getInitialState({
  action: ProductsActions,
  loaded: false,
});
```

Even then, there are no products.  Yes, the products are there in the Redux tab.  Now there is no empty array.  No error, but no products.  Sometimes an error is better.  Now there is nothing left to do except review *everything*!

OK, stop whining.  This is about learning.  If you don't get it, start from the beginning and step through it all.  It's true that the payload has been added where it was inconsitently applied before.

It turns out, that was the last issue.  If we replace paylod with products here, then we get out list and can move on to the next step:

```js
  on(ProductsActions.loadProductsSuccess, (state, { payload: products }) => ({
    ...state,
    payload: products,
    loaded: true,
  })),
```
