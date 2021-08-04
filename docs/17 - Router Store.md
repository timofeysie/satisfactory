# 17 - [Router Store](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/17-router-store)

Branch: step-17-Router-Store

## To do

- update adapter doc links
- part 4 code sample needs file path
- add disclaimer at the end that the app wont run until after the next section
- include a reason for using the entity and adapter pattern
- section 13 shows loaded in the reducer initial state but loading in on functions.
- section 14 says "Add a file called index.ts to the +state folder of your auth state lib" then shows the products.selectors.ts file.
- AuthEntity is seen in section 13, scaffolded by the cli.  So then why do we wait until section 16 to introduce entities?

- add route to products module

## Step 1. Add a new presentational components for products

ng g c components/product-list --project=products

```txt
nx generate @nrwl/angular:component containers/product-list --project=products
CREATE libs/products/src/lib/containers/product-list/product-list.component.html
CREATE libs/products/src/lib/containers/product-list/product-list.component.spec.ts
CREATE libs/products/src/lib/containers/product-list/product-list.component.ts
CREATE libs/products/src/lib/containers/product-list/product-list.component.scss
```

## Step 2. Add material module to Products module

Add the route:

libs\products\src\lib\products.module.ts

Added a few more routes, fixed up the css to scss and app to demo-app changes.

Converted the switch statements in the effect to the new format with the migrate cli command, and it all works well.
