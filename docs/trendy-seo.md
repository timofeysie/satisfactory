# Trendy SEO

Here are the links collected.

https://yoast.com/image-seo/

https://www.webceo.com/blog/how-to-do-seo-for-news-websites/#6_get_featured_in_google_news

The guide is [How to Make Angular SEO Friendly Website with Angular Universal?](
https://aglowiditsolutions.com/blog/angular-seo/amp/) by Saurabh Barot.

This details how to use title and meta data.  It had the note:

ng add @nguniversal/express-engine --clientProject project-name

We already have the @nguniversal/express-engine packed from the SSR portion.  What we don't have is the CLI commands to use it:

npm run build:SSR && npm run serve:SSR

npm run prerender on the project and use guess-parser to guess the application’s routes

Before that, where do we put the title and meta?

Options are:

## 1. trendy-layout lib

Header
Sidenav
ng-content
Footer

## 2. the pictures module component

This has the routes and the Mike Richards demo components.
It's like the home page which can have the list of trends.

## 3. the Mike Richards component

This has the two containers for the artworks, where the data is currently.

I suppose, it's either #2 or #3.

It has to be #3 if we cannot pass down data via @Inputs and still have SEO.
If we can have data via @Inputs, then we can have a generic picture-card component to reuse.

The plan is to have both types, and do some AB testing to see if it makes a difference for SEO.

Anyhow, back to a the SSR build, it was the [Benjamin Cabanes](https://blog.nrwl.io/nx-workspace-schematics-server-side-rendering-ssr-with-angular-universal-afc04ead55) that we tried to implement with the trendy-ssr server that didn't work:

```txt
ng run tuskdesk:build --configuration=production
ng run tuskdesk:server --configuration=production
ng run tuskdesk-ssr:serve
```

Remember, the error when running the serve was:

```err
ERROR in ./dist/trendy/server/main.js 4527:84
Module parse failed: 'with' in strict mode (4527:84)
```

That lib is still there, but doesn't work.  We did deploy the app to firebase, but it would be good to test locally.

Can we run these commands instead from the Saurabh Barot article?  It shows these commands:

```txt
npm run build:SSR && npm run serve:SSR
```

These commands run:

```txt
nx run trendy:build:SSR
nx run trendy:serve:SSR
```

And we see this output.  Otherwise, things look the same.

```txt
> nx run trendy:build:SSR
> nx run trendy:build:production 
✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.
Initial Chunk Files               | Names         |       Size
main.1cf1c78879fcdb6d9275.js      | main          |  446.30 kB
styles.af2dae860b714bbe4d76.css   | styles        |   73.84 kB
polyfills.5fafc97707a25290eb38.js | polyfills     |   35.94 kB
runtime.877bf4199a311a340e39.js   | runtime       | 1023 bytes
                                  | Initial Total |  557.08 kB
Build at: 2021-09-02T05:00:27.036Z - Hash: 531147c79331c878d12f - Time: 35610ms
———————————————————————————————————————————————
>  NX   SUCCESS  Running target "build" succeeded

PS C:\Users\timof\repos\timofeysie\satisfactory> nx run trendy:serve:SSR
> nx run trendy:serve:development 
✔ Browser application bundle generation complete.
Initial Chunk Files   | Names         |      Size
vendor.js             | vendor        |   4.92 MB
polyfills.js          | polyfills     | 472.96 kB
styles.css, styles.js | styles        | 421.20 kB
main.js               | main          |  53.69 kB
runtime.js            | runtime       |   6.57 kB
                      | Initial Total |   5.86 MB
Build at: 2021-09-02T05:01:01.046Z - Hash: a1af73eb971d65d19e5b - Time: 13170ms
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
√ Compiled successfully.
✔ Browser application bundle generation complete.
5 unchanged chunks
Build at: 2021-09-02T05:01:04.213Z - Hash: f3f532a9fcd1ff4549ac - Time: 2207ms
√ Compiled successfully.
```

Disabling JavaScript and refresh and we get a blank page.

So I guess we need to run this:

```txt
npm run prerender
```

Or for us:

```txt
nx run trendy:prerender
 ERROR  Cannot find target 'prerender' for project 'trendy'
```

nx run trendy:prerender:dev

Not gunna work.

In [this issue](https://github.com/nrwl/nx/issues/5915) it shows this command:

```txt
> nx add @nguniversal/express-engine
Could not find project "@nguniversal/express-engine"
> nx add @nguniversal/express-engine  --project=trendy       
 ERROR  Cannot find target 'add' for project 'trendy'
```

The "Steps to Reproduce" in that issue up there are:

```txt
npx create-nx-workspace marketplace --preset=angular
cd marketplace
nx add @nguniversal/express-engine
```

add "prerender" in nx.config.json > tasksRunnerOptions.default.runner.cacheableOperations

```txt
nx run marketplace:prerender
```

I don't see an app being created there.  I have no idea what nx.config.json is, and neither does Google.  There is an nx.json with a tasksRunnerOptions section.

```json
  "tasksRunnerOptions": {
    "default": {
      "runner": "@nrwl/workspace/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"]
      }
    },
    "prerender": {
      "builder": "@nguniversal/express-engine:prerender",
      "output": ["dist/apps/trendy/browser"],
      "options": {
        "browserTarget": "trendy:build",
        "serverTarget": "trendy:server",
        "guessRoutes": true
      }
    }
  },
```

Now, how to run that?  Maybe like this?

```txt
nx run trendy:build:prerender
nx run trendy:serve:prerender
```

The docs only say: *Tasks runners are invoked when you run nx test, nx build, nx run-many, nx affected, and so on. The tasks runner named "default" is used by default. Specify a different one by passing --runner.*

Sorry for my ignorance, but is that somewthing like this?

```txt
nx run trendy:build --prerender
> nx run trendy:build:production --prerender 
'prerender' is not found in schema
———————————————————————————————————————————————
>  NX   ERROR  Running target "trendy:build" failed
```

Or this:

```txt
nx run trendy:build --runner:prerender
> nx run trendy:build:production --runner:prerender 
'runner:prerender' is not found in schema
———————————————————————————————————————————————
>  NX   ERROR  Running target "trendy:build" failed
  Failed tasks:
  - trendy:build:production
```

This works:

```txt
nx run trendy:build:prerender
```

The Saurabh Barot article says put this in the angular.json file:

```json
        "prerender": {
          "builder": "@nguniversal/builders:prerender",
          "options": {
            "browserTarget": "universal-app:build:production",
            "serverTarget": "universal-app:server:production",
            "routes": [
              "/", 
              "/about-us",
              "/contact-us"
            ]
          },
          "configurations": {
            "production": {}
          }
        }
```

What about the nx.json file?  Can it have this?

```json
    "prerender": {
      "builder": "@nguniversal/express-engine:prerender",
      "output": ["dist/apps/trendy/browser"],
      "options": {
        "browserTarget": "trendy:build",
        "serverTarget": "trendy:server",
        "guessRoutes": true,
        "routes": [
              "/", 
              "/home",
              "/Mike%20Richards"
            ]
      }
    }
```

```txt
nx run trendy:build:prerender --configuration=production
nx run trendy:server:prerender --configuration=production
```

These appear to be working:

```txt
PS C:\Users\timof\repos\timofeysie\satisfactory> nx run trendy:build:prerender --configuration=production
> nx run trendy:build:production [existing outputs match the cache, left as is]
Initial Chunk Files               | Names         |       Size
main.1cf1c78879fcdb6d9275.js      | main          |  446.30 kB
styles.af2dae860b714bbe4d76.css   | styles        |   73.84 kB
polyfills.5fafc97707a25290eb38.js | polyfills     |   35.94 kB
runtime.877bf4199a311a340e39.js   | runtime       | 1023 bytes
                                  | Initial Total |  557.08 kB
Build at: 2021-09-02T09:59:32.578Z - Hash: 531147c79331c878d12f - Time: 34676ms
———————————————————————————————————————————————
  Nx read the output from cache instead of running the command for 1 out of 1 tasks.
PS C:\Users\timof\repos\timofeysie\satisfactory> nx run trendy:server:prerender --configuration=production
> nx run trendy:server:production 
✔ Server application bundle generation complete.
Initial Chunk Files | Names         |    Size
main.js             | main          | 2.53 MB
                    | Initial Total | 2.53 MB
Build at: 2021-09-02T14:10:44.175Z - Hash: ce5171b600f0876cbd8d - Time: 21575ms
———————————————————————————————————————————————
>  NX   SUCCESS  Running target "server" succeeded
```

But I don't see anything about routes rendered there.  And we can't test it.  Maybe we could back in Oct 18, 2019.

This is getting old now.  Try and test after deployment and come back here later.

https://yoast.com/structured-data-schema-ultimate-guide/

robot.txt investigation.
