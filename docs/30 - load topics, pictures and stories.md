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

### Implement get category

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

What does work is adding the category as part of the API path.

```ts
      category !== null
        ? `http://localhost:3333/api/products/${category}`
        : `http://localhost:3333/api/products`;
```

Strangely to me, the url in the browser changes to what I think it should be.

http://localhost:4200/products?category=tools

What I had expected was to use it like this:

```txt
`http://localhost:3333/api/products?category=${category}`
```

But this doesn't work.  So using the api/products/${category}.

Still, not looking good for an article when what I expect to work doesn't.  There is still time for this as the auth section actually would come before the products section, so the above would need to split out the Nest getting started part, then have an auth section, then the products section.

## Products detail view

We need a new component for the detail view.

nx generate @nrwl/angular:component containers/product-detail --project=products

Probably should have put that in a components directory.  But this will do for now.

### Throwing inside of an async function without a catch block

Or rejecting a promise which was not handled with .catch().

This happened with the text API:

http://localhost:3333/api/text/nets%20vs%20rockets

http://localhost:3333/api/text/nets vs rockets

Here is the full error:

(node:23548) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 31)

Run it again and the top of the error looks like this:

```txt
(node:23956) UnhandledPromiseRejectionWarning: TypeError: request is not a function
    at C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\nest-demo\webpack:\apps\nest-demo\src\app\text\text.service.ts:37:7
```

https://jonasjancarik.medium.com/handling-those-unhandled-promise-rejections-when-using-javascript-async-await-and-ifee-5bac52a0b29f

The answer to the "by rejecting a promise" part would be this:

.catch(e => { console.log(e) })

Doesn't appear to work for us.

The other option is to use a try/catch block.

That also does not work.

There are two errors at play here:

error TypeError: request is not a function
    at C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\nest-demo\webpack:\apps\nest-demo\src\app\text\text.service.ts:38:9

And the other: UnhandledPromiseRejectionWarning: Unhandled promise rejection...

So it is about request for some reason.  I changed the import to this and it works:

```ts
import request from 'request';
```

Then, when working on the next task:

zone.js:2863 GET http://localhost:3333/api/images/Student%20loans 500.

TypeError: request is not a function
    at C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\nest-demo\webpack:\apps\nest-demo\src\app\images\images.service.ts:25:7

The solution was to return the promise:

apps/nest-demo/src/app/products/products.controller.ts

```js
  @Get()
  async findAll() {
    return this.productsService.findAll().then((result) => {
      return result;
    });
  }
```

apps/nest-demo/src/app/products/products.service.ts

```js
  async findAll() {
    return new Promise((resolve) => {
      ...
```

## Get a particular topic json file

Got this error:

Argument of type 'Buffer' is not assignable to parameter of type 'string'.

The solution was to add the encoding (utf-8):

```js
  getCategory(category: string) {
    return new Promise((resolve, reject) => {
      fs.readFile('./posts/' + category, 'utf-8', (err, file) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(file));
      });
    });
  }
```

Test like this:

http://localhost:3333/api/products/Belfast.json

To use this on the front end, I think we will have to dispatch an action.

loadFilteredProducts$
