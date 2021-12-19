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
```

We would also like to expand the Duncan to show how to scaffold a Nest app to replace the db.json and demo server.ts file.

So we should start off with the command to scaffold the products.

The scaffolding command would look like this:

```txt
nx generate @nestjs/schematics:resource products --sourceRoot apps/nest-demo/src/app
```
