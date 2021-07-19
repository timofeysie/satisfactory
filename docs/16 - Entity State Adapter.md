# 16 - Entity State Adapter

## To do

1 - Provide basic description of why Entity is used
2 - decide between the name adapter and productAdapter in the products reducer
3 - update adapter doc links
4 - part 4 code sample needs file path
5 - add disclaimer at the end that the app wont run until after the next section
6 - include a reason for using the entity and adapter pattern
7 - section 13 shows loaded in the reducer initial state but loading in on functions.
8 - section 14 says "Add a file called index.ts to the +state folder of your auth state lib" then shows the products.selectors.ts file.
9 - AuthEntity is seen in section 13, scaffolded by the cli.  So then why do we wait until section 16 to introduce entities?

## The Entity Sate and adapter description

The store is like an in-memory database, and the Entity class gives a unique identifier to each object similar to a primary key.  In this way objects can then be flattened out and linked together using the entity unique identifiers, just like in a database. This makes it simpler to combine the multiple entities and 'join' them via a selector query.

The Entity State format consists of the objects in a map called "entities", and store the order of the objects in an array of ids.

The Adapter is a utility class that provides a series of functions designed to make it really simple to manipulate the entity state.

This description is a brief of what I learned from reading [this Angular University piece on the subject](https://blog.angular-university.io/ngrx-entity/).

One thing to figure out is if the scaffolding command now generates and installs NgRx Entity which is shown as being installed at the start of section 16.

The answer is yes, it is included when using nx g @nrwl/angular:ngrx

So we will have to remove that, and reorganize the info a bit with this in mind.

## Step walk through

1. npm install entity from NgRx
2. Use entity adapter in reducer

These steps are already done as part of the scaffolding these days.

This is what the course shows:

```js
interface ProductsData extends EntityState<Product> {
export interface ProductsState {
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});
export const initialState: ProductsData = adapter.getInitialState({
/// Abbreviated
```

This is what we have:

```js
export interface ProductsData {
export interface ProductsState {
export interface State extends EntityState<ProductsEntity> {
export interface ProductsPartialState {
export const productsAdapter: EntityAdapter<ProductsEntity> = createEntityAdapter<ProductsEntity>();
export const initialState: State = productsAdapter.getInitialState({
```

OK, so the ProductsData can be updated to extend the entity state:

```js
export interface ProductsData extends EntityState<Product> {
  error: string;
  selectedProductId: number;
  loading: boolean;
}
```

The const adapter is the same as the productsAdapter.  Might need to update this name in other parts of the code.  I personally like productsAdapter as a better name.

There is an issue with this verses the current interface which looks like this:

```js
export const initialState: State = productsAdapter.getInitialState({
  action: ProductsActions,
  loaded: false,
});
```

Using the new version with the selectedProductId and loading instead of loaded, the error with this is:

```txt
Type 'EntityState<ProductsEntity> & { error: string; selectedProductId: any; loading: false; }' is not assignable to type 'ProductsData'.
  Types of property 'entities' are incompatible.
    Type 'Dictionary<ProductsEntity>' is not assignable to type 'Dictionary<Product>'.
      Type 'ProductsEntity' is missing the following properties from type 'Product': name, categoryts(2322)
```

To make this work, we would need add this to the ProductsEntity model:

```js
export interface ProductsEntity {
  id: number; // Primary ID
  name: string;
  category: string;
}
```

Even then, the actual reducer has an error:

```js
export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
```

The productReducer state has the following error:

```txt
Argument of type 'State' is not assignable to parameter of type 'ProductsData'.
  Type 'State' is missing the following properties from type 'ProductsData': selectedProductId, loading ts(2345)
```

At least the initial state is the same, except for the name change shown above.

Deal with this error after making the other updates in the Updated ProductsData State Error section below.

### Step 3. Update the default reducer logic

This shows the following file:

libs/admin-portal/users/+state/users.reducer.ts

Obviously this is some kind of error.  But the contents of the file shows the old style product reducer:

```js
case ProductsActionTypes.LoadProducts:
  return { ...state, loading: true };

case ProductsActionTypes.LoadProductsSuccess: {
  return adapter.addAll(action.payload, { ...state, error: '' });
}

case ProductsActionTypes.LoadProductsFail: {
  return adapter.removeAll({ ...state, error: action.payload });
}
```

Compare that with what we have now:

```js
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { payload: products }) => ({
    ...state,
    products: products,
    loaded: true,
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
```

Notice it's using the adapter in there.

However, I don't see addAll() in the dot complete list.  Remove all is there.

The link for the adapter docs is also broken.  Add that to the todo list.

What is the replacement for addAll?

The old link: https://github.com/ngrx/platform/blob/master/docs/entity/adapter.md

*addAll: Replace current collection with provided collection*

The new docs: https://ngrx.io/guide/entity/adapter

*setAll: Replace current collection with provided collection.*

The example of setAll used in a reducer looks like this:

```js
  on(UserActions.loadUsers, (state, { users }) => {
    return adapter.setAll(users, state);
  }),
```

So then our version for products might be this:

```js
  on(ProductsActions.loadProductsSuccess, (state, { products }) => {
    return adapter.setAll(products, state);
  }),
```

I'm still unsure of when to include 'payload' and when to leave it out.  Worth a run, but no, here is what we get:

```txt
Error: libs/products/src/lib/+state/products.reducer.ts:51:53 - error TS2339: Property 'products' does not exist on type '{ payload: Product[]; } & TypedAction<ProductsActionTypes.LoadProductsSuccess> & { type: ProductsActionTypes.LoadProductsSuccess; }'.
51   on(ProductsActions.loadProductsSuccess, (state, { products }) => {
```

Adding one payload works:

```js
  on(ProductsActions.loadProductsSuccess, (state, { payload: products }) => {
    return productsAdapter.setAll(products, state);
  }),
```

But I'm also seeing this:

```js
Error: libs/products/src/lib/+state/products.selectors.ts:6:71 - error TS2339: Property 'products' does not exist on type 'ProductsData'.
6 const getProducts = createSelector(getProductsState, (state) => state.products);
```

Now we can see the state containing the id array and the products array as is the pattern when using entities.

The next step is to add the default selectors.  Although the step doesn't show updating the products component, the app is not going to run now without doing that.

```txt
Error: libs/products/src/lib/containers/products/products.component.ts:21:5 - error TS2322: Type 'Observable<ProductsEntity[]>' is not assignable to type 'Observable<Product[]>'.
  Type 'ProductsEntity[]' is not assignable to type 'Product[]'.
    Type 'ProductsEntity' is missing the following properties from type 'Product': name, category
21     this.products$ = this.store.pipe(select(productsQuery.getProducts));
```

This will be fixed in the next step, which is named 17 - Router Store for some reason.

### ProductsData State Error

As mentioned before, when updating the ProductsData interface, we get this error with the store at the end of the file where the reducer is exported:

```js
return productsReducer(state, action);
```

The TS errors says:

```txt
Argument of type 'State' is not assignable to parameter of type 'ProductsData'.
  Property 'selectedProductId' is missing in type 'State' but required in type 'ProductsData'.ts(2345)
products.reducer.ts(16, 3): 'selectedProductId' is declared here.
```

It seems like the sate needs to be updated, and trying that previously seemed to make the situation and error worse.  So here we will back up a bit a realize what other changes need to happen to support the Entity State changes for this section.  Any changes needed are not shown in the workshop code samples, so we are on our own here, so to speak.

```js
export interface State extends EntityState<User> {
  // additional entities state properties
  selectedUserId: string | null;
}
 
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
});
```

The "additional entity state properties" comment says, yes, we need the other state properties there, such as error and loading.  If we have the product ID, then what about the map of product objects?

The error clearly says: *Property 'selectedProductId' is missing in type 'State'*

```js
export interface State extends EntityState<ProductsEntity> {
  selectedId?: string | number;
```

Shouldn't selectedId be selectedProductId?  Give that a try and the error changes:

```txt
Argument of type 'State' is not assignable to parameter of type 'ProductsData'.
  Types of property 'selectedProductId' are incompatible.
    Type 'string | number' is not assignable to type 'number'.
      Type 'string' is not assignable to type 'number'.ts(2345)
```

OK, so do ProductsData and State need to have the same properties and extend the same thing?

There might be an issue with using Product instead of ProductEntity as a generic type:

```js
export const productsAdapter: EntityAdapter<ProductsEntity> = createEntityAdapter<ProductsEntity>();
export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({});
```

The Duncan shows the second (with the name adapter which I changed to productAdapter).

If we make ProductsData and the State interfaces the same (what's the point of both if they are the same), then the error changes to this:

```txt
Type 'Dictionary<ProductsEntity>' is not assignable to type 'Dictionary<Product>'.
  Type 'ProductsEntity' is missing the following properties from type 'Product': name, categoryts(2345)
```

```txt
Argument of type 'State' is not assignable to parameter of type 'ProductsData'.
  Types of property 'entities' are incompatible.
    Type 'Dictionary<ProductsEntity>' is not assignable to type 'Dictionary<Product>'.
      Type 'ProductsEntity' is missing the following properties from type 'Product': name, category
```

I changed the State interface to use Product in stead of ProductsEntity like this:

```js
export interface State extends EntityState<Product> {
```

And now everything works.  I did give a try at changing loaded to loading, but the auth.selectors.ts is throwing an error:

  (state: State) => state.loading

That actually works in the editor, but the browser has an error.
If the editor has an error, the browser doesn't and the app runs and I see the products.

## Notes on getting started with this section

After getting the products sorted, and running well, all of a sudden there is a template linting error in the libs\products\src\lib\containers\products\products.component.html file.

```html
<p>products works!</p>
{{products$ | async | json}}
```

It's a pretty harmless piece of debugging code that just prints out the json of the products returned from the demo server.  Both pipes have errors under them.  The async error says:

```txt
No pipe found with name 'async'.ngtsc(-998004)
```

After a bit of googling, I found [one person](https://www.programmersought.com/article/84735645750/) who saw this error and fixed it.

Jerry's answer involves importing the Common module into the parent module, which we already have.  The app still runs without error, so leaving this for now, as this code will be replaced with an actual product display, and if the error is still around then, we can come back to it.

## Login credentials not being saved

Another problem which could be considered a defect is that the logged in state is lost on refresh.  A few steps ago, the state was saved in the local storage so the user wouldn't have to log in over and over again.  This should be fixed as it's annoying during development, and is probably a regression that hopefully is not in the workshop, but this should be looked at.

After some investigation, I thought it was the server login api that was just not working.  I've always had the idea of swapping out the old demo server with a scaffolded NestJS one.  I created a branch with that and got the scaffolding commands down to replace the login, then realized the problem with the old server was actually the login api was not being called, so that's why the credentials were not being stashed in local storage.

```js
import { AuthService } from './../services/auth/auth.service';

  run: (action) => {
    console.log('action', action);
    this.authService.login(action['payload']).subscribe();
  },

constructor(
  private actions$: Actions,
  private authService: AuthService,
```

That works is auth.effects. but we can't have that bracket notation.

Why is the auth effect so different from the products effect?

```js
mergeMap(() =>
  this.productService.getProducts().pipe(
    map(
      (products: Product[]) =>
        ProductActions.loadProductsSuccess({ payload: products })
    ),
    catchError((error) => of(ProductActions.loadProductsFailure({ error })))
  )
)
```

The scaffolding command gave us the fetch usage.  Trying to use the same approach as products works also:

```js
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          map(
            (user) => ({ type: AuthActionTypes.LoginSuccess, payload: user }),
            catchError((error) => of(AuthActions.loginFailure(error)))
          )
        )
      )
    )
  );
```

But there is no error if the user enters an incorrect password.  Shouldn't that be shown?

There is a message we could print "Incorrect username or password".

In the Redux dev tools, I see

```txt
loaded(pin):false
loading(pin):true
```

That doesn't sound like the error is happening properly.  The previous code I don't think was doing that either.

There is already a selector for this;

```js
authError$ = this.store.select(getAuthError.toString);
```

But it shows nothing.  The fact that the store says loading = true after a failed login doesn't give me confidence that it's working as expected.

If the products array in db.json is removed, there is no error message from the server except a Status Code: 404 Not Found.  The response is just an empty {}.  And then there are the loading spinners which have properties but are not used.
