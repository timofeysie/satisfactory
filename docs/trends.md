# Trends

## The backend

This document describes setting up [google-trends-api](https://www.npmjs.com/package/google-trends-api#dailyTrends).

```txt
nx generate @nestjs/schematics:resource trends --sourceRoot apps/nest-demo/src/app
```

The docs show using require:

```js
const googleTrends = require('google-trends-api');
```

The TypeScript was to do this in the apps\nest-demo\src\app\trends\trends.service.ts

```js
import * as googleTrends from 'google-trends-api';

findAll() {
    return googleTrends.dailyTrends(
      {
        trendDate: new Date(),
        geo: 'US',
      },
      function (err, results) {
        if (err) {
          return err;
        } else {
          return results;
        }
      }
    );
  }
```

Now, about that callback.

## The front end

The same steps that went into making the products lib in [step 9 - Route Guards and Products Lib](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/9-route-guards-and-products-lib) can be repeated here to build out the trends front end.

Here are the commands to create the lib and a container.

```txt
nx generate @nrwl/angular:lib trends --routing --lazy --parent-module=apps/customer-portal/src/app/app.module.ts
nx g @nrwl/angular:component  containers/trends --project=trends
```

Next add a route.here: apps/customer-portal/src/app/app.module.ts

The data models can be shared via a [library](https://docs.nestjs.com/cli/libraries).

Update the ProductsModule route here: libs/trends/src/lib/trends.module.ts

```js
RouterModule.forChild([
  { path: '', pathMatch: 'full', component: TrendsComponent },
]),
```

Add a button to the header: libs\layout\src\lib\containers\layout\layout.component.html

We don't need to do anything to the route guard to protect trends page: libs/auth/src/lib/guards/auth/auth.guard.ts

But we need to add this to apps\customer-portal\src\app\app.module.ts

```js
canActivate: [AuthGuard],
```

### Extras to do

1. Add logout functionality
2. Add angular interceptor
