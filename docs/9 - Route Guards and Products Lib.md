# Step 9 - Route Guards and Products Lib

Branch: step-9-Route-Guards-and-Products-Lib

Steps.

1. Add a lazy loaded lib Products with routing & a products container component to the lib
2. Update the RouterModule.forRoot array in apps\customer-portal\src\app\app.module.ts
3. Add ProductsModule route
4. Generate a guard with the CLI & add the auth guard logic
5. Add auth guard to main routes

6. Check the route guard is working
7. Cache the user in local storage to save logging in for the rest or the workshop.

```txt
nx generate @nrwl/angular:lib products --routing --lazy --parent-module=apps/customer-portal/src/app/app.module.ts
...
CREATE libs/products/README.md
CREATE libs/products/tsconfig.lib.json
CREATE libs/products/src/index.ts
CREATE libs/products/src/lib/products.module.ts
CREATE libs/products/tsconfig.json
CREATE libs/products/jest.config.js
CREATE libs/products/src/test-setup.ts
CREATE libs/products/tsconfig.spec.json
CREATE libs/products/.eslintrc.json
UPDATE package.json
UPDATE workspace.json
UPDATE nx.json
UPDATE tsconfig.base.json
UPDATE .vscode/extensions.json
UPDATE jest.config.js
UPDATE apps/customer-portal/src/app/app.module.ts
UPDATE apps/customer-portal/tsconfig.app.json
```

```txt
nx g @nrwl/angular:component containers/products --project=products
CREATE libs/products/src/lib/containers/products/products.component.html
CREATE libs/products/src/lib/containers/products/products.component.spec.ts
CREATE libs/products/src/lib/containers/products/products.component.ts     
CREATE libs/products/src/lib/containers/products/products.component.scss   
UPDATE libs/products/src/lib/products.module.ts
```

Error: Cannot find module '@demo-app/products'
    at $_lazy_route_resources|lazy|groupOptions: {}|namespace object:5

After updating the RouterModule.forRoot array and adding the ProductsModule route in the products.module.ts, it's time to run the app.

The instructions are: "Login again to check the routing is correctly configured by trying to click the 'products' button in the main menu."

However, we are getting this runtime error:

```txt
Error: Uncaught (in promise): Error: Cannot find module '@demo-app/products'
Error: Cannot find module '@demo-app/products'
    at $_lazy_route_resources|lazy|groupOptions: {}|namespace object:5
```

Try with new syntax of module imports:

```js
loadChildren: () =>
  import('@demo-app/products').then(
    (mod) => mod.ProductsModule // added
  ),
```

This works.  Time to update the course which shows source from the end of the section, not the source as it should be in-progress so that the source shown at this point in the section will run.

When adding the auth guard login, the path to the service needs to be updated to this:

```js
import { AuthService } from '../../services/auth.service';
```

Had to add an ESLint ignore statement for the debugger line to work:

```js
// eslint-disable-next-line no-debugger
debugger;
```

Update the path to the service in the auth.guard from this:

```txt
libs/auth/src/lib/services/auth/auth.service.ts
```

To this:

```txt
libs/auth/src/lib/services/auth.service.ts
```

You can see from other directories, such as auth guard, that the services actually is wrong.

```txt
libs\auth\src\lib\guards\auth\auth.guard.spec.ts
```

It would become apparent as an error when the user tries to create another service.  This actually means that we needed to have a sub-folder in the services directory.  Where were those created again?

In step 5, this command is shown.
That should be correct.  Not sure why I excluded the extra auth directory needed.

```js
nx generate @nrwl/angular:service services/auth/auth
```

The cleanup for this is a bit of work, as every branch since then will need to be updated.

Creating the folder and moving the service there now will cause the following errors:

```txt
./libs/auth/src/index.ts:2:0-58 - Error: Module not found: Error: Can't resolve './lib/services/auth.service' in 'C:\Users\timof\repos\timofeysie\angular\demo-app\libs\auth\src'

./libs/auth/src/lib/containers/login/login.component.ts:1:0-58 - Error: Module not found: Error: Can't resolve '../../services/auth.service' in 'C:\Users\timof\repos\timofeysie\angular\demo-app\libs\auth\src\lib\containers\login' 

./libs/auth/src/lib/guards/auth/auth.guard.ts:2:0-58 - Error: Module not found: Error: Can't resolve '../../services/auth.service' in 'C:\Users\timof\repos\timofeysie\angular\demo-app\libs\auth\src\lib\guards\auth'

./libs/layout/src/lib/containers/layout/layout.component.ts:51:116-130 - Error: export 'AuthService' (imported as 'i1') was not found in '@demo-app/auth' (possible exports: AuthGuard, AuthModule, authRoutes)

Error: libs/auth/src/index.ts:2:29 - error TS2307: Cannot find module './lib/services/auth.service' or its corresponding type declarations.

2 export { AuthService } from './lib/services/auth.service';
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Error: libs/auth/src/lib/containers/login/login.component.ts:2:29 - error TS2307: Cannot find module '../../services/auth.service' or its corresponding type declarations.

2 import { AuthService } from '../../services/auth.service';
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Error: libs/auth/src/lib/guards/auth/auth.guard.ts:9:29 - error TS2307: Cannot find module '../../services/auth.service' or its corresponding type declarations.
9 import { AuthService } from '../../services/auth.service';
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

Have to make the change in these files:

```txt
libs/auth/src/lib/containers/login/login.component.ts
libs/auth/src/lib/guards/auth/auth.guard.ts
libs/auth/src/index.ts
```

As long as the tutorial all have the correct path, I'm not too worried about the branches for now.
