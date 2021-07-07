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

Did I move that?

nx generate @nrwl/angular:service services/products/products

nx generate @nrwl/angular:service --project=services/products/products
