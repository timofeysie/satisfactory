# Step 18 - Deploying An Nx Monorepo

Branch: 18-Deploying-An-Nx-Monorepo

The original readme for this project shows this command:

```txt
Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
```

The workshop step says *we cannot build the lib itself. We can only do it by building an app that depends on it.*

This doesn't sound like an issue unless we want to publish a lib to npm or something.

The command shown for the build is:

```shell
ng build --prod -a=admin-portal
```

For one, it's the customer-portal, not the admin-portal.

```shell
nx build customer-portal
```

Next, we are shown how to use an analysis tool to inspect the size of the app.

```shell
npm install  --save-dev webpack-bundle-analyzer
```

nx build --prod -a=customer-portal --stats-json

This all goes something like this:

```perl
> nx build customer-portal
> nx run customer-portal:build:production 
✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.
Initial Chunk Files               | Names         |      Size
main.1d50e3eb35a9472da02d.js      | main          | 674.34 kB
styles.8dafba5586bfeae98424.css   | styles        |  73.83 kB
polyfills.794c64704bd54624f966.js | polyfills     |  35.94 kB
runtime.322b65d42a82e5a390e5.js   | runtime       |   2.46 kB
                                  | Initial Total | 786.58 kB
Lazy Chunk Files                  | Names         |      Size
418.6ae74eb99f6652e21c6e.js       | -             |   4.69 kB
Build at: 2021-07-18T10:22:52.054Z - Hash: 7f636fe04a7fbddecec0 - Time: 35492ms
Warning: initial exceeded maximum budget. Budget 500.00 kB was not met by 286.58 kB with a total of 786.58 kB.
>  NX   SUCCESS  Running target "build" succeeded

PS C:\Users\timof\repos\timofeysie\nx\nx-12-demo-app> nx build --prod -a=customer-portal --stats-json
> nx run customer-portal:build:production --a=customer-portal --statsJson 
'a' is not found in schema
———————————————————————————————————————————————
>  NX   ERROR  Running target "customer-portal:build" failed
  Failed tasks:
  - customer-portal:build:production
```

So that doesn't work.  Using --app  instead of --a gives this error:

> nx run customer-portal:build:production --a --p --p=customer-portal --statsJson
'a' is not found in schema

Using ng doesn't work as usual:

```shell
 ng build --prod -app=customer-portal --stats-json
The build command requires to be run in an Angular project, but a project definition could not be found.
```

But wait, we don't need a flag at all for a build.  Just do this:

```js
nx build --prod customer-portal --stats-json   
```

We will have to update the script name as well as the running command:

```txt
npm run bundle-report-customer-portal
```

It would be nice to add screenshots from the analyzer and the dependency graph, but more important is to get the unit and e2e tests working again.  There have been a lot of changes since they last ran.
