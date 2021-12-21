# 30 load topics, pictures and stories

We need to be able to show a list of topics, pictures and combined stories and eventually let the user compose new arrangements and edit current ones.

We still have the products laying around, with sorting.  This feature can be hijacked and give us a starting point for that.  We want will also need to add fields for the data to be sorted by date and category.

## Implementing fetchAll products

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

Without making too many design decisions at this point, lets just create a json file in the same directory as the route files and put just the products in it for now:

apps\nest-demo\src\app\products\products.json

In TS land, there is no require statement, so the import would be something like this:

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

There are two parts of the Nest architecture which we will be working on:

1. products.controller.ts - @Get(':category') annotation sends params to the service
2. products.service.ts - does the work and returns the result

The Nest cli generated products.service out of the box has a default return value hard coded:

apps\nest-demo\src\app\products\products.service.ts

```ts
  findAll() {
    return `This action returns all products`;
  }
```

Change that return statement to this: return productsArray.products;

Then we can get our products with the following url:

http://localhost:3333/api/products

Next, we need to use that in the products lib:

libs\products\src\lib\services\products\products.service.ts

```ts
  getProducts(category = null): Observable<Product[]> {
    const url =
      category !== null
        ? `http://localhost:3000/products?category=${category}`
        : `http://localhost:3333/api/products`;
    return this.httpClient.get<Product[]>(url);
  }
```

## Implement get category

The service is overloaded to return either all the products, or a particular category of products.

```ts
  getProducts(category = null): Observable<Product[]> {
    const url =
      category !== null
        ? `http://localhost:3000/products?category=${category}`
        : `http://localhost:3333/api/products`;
    return this.httpClient.get<Product[]>(url);
  }
```

To keep this API backwards compatible, we will leave that as it is right now and add a new route that accepts a category parameter.  

Out of the box, we have a route that takes an id to find a specific product.

apps\nest-demo\src\app\products\products.controller.ts

```ts
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
```

Change to the function to use a category parameter.

```ts
  @Get(':category')
  getCategory(@Param('category') id: string) {
    return this.productsService.getCategory(id);
  }
```

apps\nest-demo\src\app\products\products.service.ts

```ts
  getCategory(category: string) {
    const filteredArray = productsArray.products.filter(function (item) {
      return item.category == category;
    });
    return filteredArray;
  }
```

The extra filteredArray const doesn't hurt and makes the function a little bit more readable.  We could create a type to use here.

After saving this, if the server is running, it will reload and we will see a new endpoint in the list:

```txt
...
[Nest] 7308 - 21/12/2021, 4:12:44 pm [RouterExplorer] Mapped {/api/products/:category, GET} route +1ms 
...
```

Then, if we test out the route by going here in the browser: http://localhost:3333/api/products/one

We will see:

```txt
This action returns a #NaN product
```
