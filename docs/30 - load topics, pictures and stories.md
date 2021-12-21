# 30 load topics, pictures and stories

We need to be able to show a list of topics, pictures and combined stories and eventually let the user compose new arrangements and edit current ones.

We still have the products laying around, with sorting.  This feature can be hijacked and give us a starting point for that.  We want will also need to add fields for the data to be sorted by date and category.

The original products from the Duncan have the following format:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Spanner",
      "category": "tools"
    },
    ...
```

We would also like to expand the Duncan to show how to scaffold a Nest app to replace the db.json and demo server.ts file.

So we should start off with the command to scaffold the products.

The scaffolding command would look like this:

```txt
nx generate @nestjs/schematics:resource products --sourceRoot apps/nest-demo/src/app
```

Choose REST API and answer yes to "Would you like to generate CRUD entry points?"

The output should look something like this:

```txt
√ What transport layer do you use? · rest
√ Would you like to generate CRUD entry points? (Y/n) · true
"SchematicsNestResource" schema is using the keyword "id" which its support is deprecated. Use "$id" for schema ID.
CREATE apps/nest-demo/src/app/products/products.controller.spec.ts
CREATE apps/nest-demo/src/app/products/products.controller.ts
CREATE apps/nest-demo/src/app/products/products.module.ts
CREATE apps/nest-demo/src/app/products/products.service.spec.ts
CREATE apps/nest-demo/src/app/products/products.service.ts
CREATE apps/nest-demo/src/app/products/dto/create-product.dto.ts
CREATE apps/nest-demo/src/app/products/dto/update-product.dto.ts
CREATE apps/nest-demo/src/app/products/entities/product.entity.ts
UPDATE apps/nest-demo/src/app/app.module.ts
```

Run the app and this is what you will see:

```txt
> nx serve nest-demo
...
[Nest] 9260   - 19/12/2021, 4:20:21 pm   [RoutesResolver] ProductsController {/api/products}: +1ms
[Nest] 9260   - 19/12/2021, 4:20:21 pm   [RouterExplorer] Mapped {/api/products, POST} route +1ms
[Nest] 9260   - 19/12/2021, 4:20:21 pm   [RouterExplorer] Mapped {/api/products, GET} route +2ms
[Nest] 9260   - 19/12/2021, 4:20:21 pm   [RouterExplorer] Mapped {/api/products/:id, GET} route +1ms       
[Nest] 9260   - 19/12/2021, 4:20:21 pm   [RouterExplorer] Mapped {/api/products/:id, PATCH} route +2ms     
[Nest] 9260   - 19/12/2021, 4:20:21 pm   [RouterExplorer] Mapped {/api/products/:id, DELETE} route +1ms    
[Nest] 9260   - 19/12/2021, 4:20:21 pm   [NestApplication] Nest application successfully started +6ms      
[Nest] 9260   - 19/12/2021, 4:20:21 pm   Listening at http://localhost:3333/api +6ms
```

The original demo shows:

```js
const db = require('./db.json');
```

In TS land that would be something like this:

```ts
import * as productsArray from './products.json';
```

However, this will cause the error:

```txt
Cannot find module 'products.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.ts(2732)
```

To solve this, we add a new compiler options section to the nest demo tsconfig file:

apps\nest-demo\tsconfig.json

```json
"compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
```

Then we update the Nest products service which gets created with a default return:

apps\nest-demo\src\app\products\products.service.ts

```tx
  findAll() {
    return `This action returns all products`;
  }
```

Change that return statement to this: return productsArray.products;

Then we can get our products with the following url:

http://localhost:3333/api/products

Next, we need to use that in the products lib:

libs\products\src\lib\services\products\products.service.ts

```tx
  getProducts(category = null): Observable<Product[]> {
    const url =
      category !== null
        ? `http://localhost:3000/products?category=${category}`
        : `http://localhost:3333/api/products`;
    return this.httpClient.get<Product[]>(url);
  }
```
