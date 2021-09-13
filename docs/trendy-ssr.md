# Trendy SSR

In the trendy-seo.md doc, the initial SSR attempt failed.  Some notes from that ended up like this:

*In [this issue](https://github.com/nrwl/nx/issues/5915) it shows this command:*

```txt
> nx add @nguniversal/express-engine
Could not find project "@nguniversal/express-engine"
> nx add @nguniversal/express-engine  --project=trendy       
 ERROR  Cannot find target 'add' for project 'trendy'
```

The clientProject flag was not working.

```txt
PS C:\Users\timof\repos\timofeysie\angular\toh-pt6> ng generate universal --client-project=angular.io-example 
Unknown option: '--client-project' 
PS C:\Users\timof\repos\timofeysie\angular\toh-pt6> ng generate universal --clientProject=angular.io-example  
Unknown option: '--clientProject' 
```

Looking at a few TOH examples, this did work:

```txt
PS C:\Users\timof\repos\timofeysie\angular\toh-pt6> ng add @nguniversal/express-engine 
Skipping installation: Package already installed 
CREATE src/main.server.ts (698 bytes) 
CREATE src/app/app.server.module.ts (318 bytes) 
CREATE tsconfig.server.json (396 bytes) 
CREATE server.ts (2044 bytes) 
UPDATE package.json (1863 bytes) 
UPDATE angular.json (5903 bytes) 
UPDATE src/main.ts (432 bytes) 
UPDATE src/app/app.module.ts (1468 bytes) 
UPDATE src/app/app-routing.module.ts (720 bytes) 
✔ Packages installed successfully. 
```

How to run ng add @nguniversal/express-engine in nx?

```txt
To transform a Angular CLI workspace to an Nx workspace, use the ng add command:
ng add @nrwl/workspace
```

ng add @nrwl/workspace @nguniversal/express-engine  --project=trendy

But this will cause the usual error:

The add command requires to be run in an Angular project, but a project definition could not be found.

What is the way to use an Angular CLI schema?  I know what it is for a generate command.

```txt
nx add @nguniversal/express-engine  --project=trendy
 ERROR  Cannot find target 'add' for project 'trendy'
```

Running nx list @nrwl/angular shows there is nothing like this.  I've got an idea to run the command in the trendy app, then remove the package.json it will create?  This might be better than manually adding the stuff.

I think the issue is we have a workspace.json, not an angular.json.

Just changing the name of workspace.json to angular.json results in this error:

```txt
An unhandled exception occurred: Workspace config file cannot be loaded: C:\Users\timof\repos\timofeysie\satisfactory\angular.json
Schema validation failed with the following errors:
  Data path "" should NOT have additional properties(generators).
See "C:\Users\timof\AppData\Local\Temp\ng-52ssZF\angular-errors.log" for further details.
```

So THAT'S not going to work!

Time for the manual approach.  What changes with that command?

In the angular.json (here the workspace.json), there is the output path which has already been changed.

The first difference is that builder is called executor in workspace.

Next, the server section has the same difference.  But the TOH example has an extra server-ssr that we don't have.

The production section is quite different:

TOH:

```json
"production": {
      "browserTarget": "angular.io-example:build:production",
      "serverTarget": "angular.io-example:server:production"
}
```

Trendy server.production section:

```json
    "production": {
      "outputHashing": "media",
      "fileReplacements": [
        {
          "replace": "apps/trendy/src/environments/environment.ts",
          "with": "apps/trendy/src/environments/environment.prod.ts"
        }
      ]
    },
```

Oh, this is getting messy!

Just adding the rest of the ssr and prerender sections for now.

Next is the scripts in package.json:

```json
    "dev:ssr": "ng run angular.io-example:serve-ssr",
    "serve:ssr": "node dist/angular.io-example/server/main.js",
    "build:ssr": "ng build && ng run angular.io-example:server",
    "prerender": "ng run angular.io-example:prerender"
```

The app name is of course trendy, but the output path is dist/apps/trendy/browser, right?

```json
"serve:ssr": "node apps/dist/trendy/server/main.js",
```

Have to confirm that one.

Also express in TOH is "@nestjs/platform-express" for us.  Is this OK?

Had to add this in the dev dependencies:

```json
"@nguniversal/builders": "^12.1.0",
```

There are no "@types/express".  Was this the issue with the article express app? We had nest, not vanilla express.  Will they work together?

There is a server.ts file in the toh root directory.  A big one:

```js
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/angular.io-example/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
```

I'm going to go ahead and add express and types to the package.json now.

We already have a src/main.server file, so move on.

The main.ts already has the changes shown in the toh: 

```js
document.addEventListener('DOMContentLoaded', () => {
```

Move on.

There is a change in the src\app\app-routing.module.ts file.

```js
  imports: [ RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
}) ],
```

We have apps\trendy\src\app\app.module.ts

```js
    RouterModule.forRoot(
      [
        { path: '', children: picturesRoutes },
        { path: 'pictures', children: picturesRoutes },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
```

That should be OK.

In the app.module.ts:

```js
BrowserModule.withServerTransition({ appId: 'serverApp' }),
```

We already have that.  Thank you for small mercies.  Changing serverApp to trendy just in case.

There is this new file: src\app\app.server.module.ts

We have that also.  So one of those scaffolding commands worked.

Now time to try out these commands again:

```txt
nx run trendy:build:ssr
nx run trendy:serve:ssr
```

There is no way this is going to work, right?

But they both work.

What about this one?

```txt
nx run trendy:prerender
```

When served, the routes also do not work.

```txt
> nx run trendy:server-ssr
> nx run trendy:server-ssr 
Required property 'browserTarget' is missing
———————————————————————————————————————————————
>  NX   ERROR  Running target "trendy:server-ssr" failed
```

Now, the routes.

This file nx.json has this section:

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
  },
```

The pictures module has this:

```js
    RouterModule.forChild([
      { path: '', component: PicturesComponent },
      { path: 'home', component: PicturesComponent },
      { path: 'Mike Richards', component: MikeRichardsComponent },
      { path: 'topic/Qivit Tittysure', component: PictureCardsComponent },
      { path: 'topic/Kylie Jenner', component: PictureCardsComponent },
```

But now the firebase serve is not working.

```txt
> nx run trendy:firebase --cmd=serve 
"BuilderProgressSchema" schema is using the keyword "id" which its support is deprecated. Use "$id" for schema ID.
'firebase' is not recognized as an internal or external command,
operable program or batch file.
ERROR: Something went wrong in @nrwl/run-commands - Command failed: firebase serve
```

What do we do about that?  In this case, for some reason the firebase cli had stopped working.  Running this to install it again fixed the issue:

```txt
npm install -g firebase-tools
```

Running the serve again works.  However, the links do not work, and going to the routes directly do not work.

I believe this is because we are trying to host a static deployment of an Angular Universal app that requires a server component to serve those pages.

Here are some notes about SSR.

- events other than routerLink clicks aren't supported. You must wait for the full client application to bootstrap and run,
- Any web server technology can serve a Universal application as long as it can call Universal's renderModule() function.
- Universal applications use the Angular platform-server package (as opposed to platform-browser), which provides server implementations of the DOM, XMLHttpRequest, and other low-level features that don't rely on a browser.
- passes client requests for application pages to the NgUniversal ngExpressEngine. Under the hood, this calls Universal's renderModule() function, while providing caching and other helpful utilities.
- The renderModule() function takes as inputs a template HTML page (usually index.html), an Angular module containing components, and a route that determines which components to display. The route comes from the client's request to the server.
- The ngExpressEngine() function is a wrapper around Universal's renderModule()
- Angular provides some injectable abstractions over these objects, such as Location or DOCUMENT; it may substitute adequately for these APIs
- server-side applications can't reference browser-only global objects such as window, document, navigator, or location.

So we need something to call the renderModule() function.  Going to try the Deploy to Firebase using Functions and Hosting step from [this article](https://dipesious.medium.com/angular-11-universal-firebase-deployment-300047b988aa) by Dipesh Bhoir

Before, functions was not an option because it was behind a paywall.  Since that wall has been breached, its time to go there.

That means running firebase init again.  The files such as firebase.json had to be moved from the app/trendy directory last time to work, so will have to do that again.  The command for nx will be.

nx run trendy:firebase --cmd=init

When it asks this question:

```txt
? Configure as a single-page app (rewrite all urls to /index.html)?
```

According to [a SO answer]() *if you would like to have Server-Side Rendering (SSR), type No and set up your rewrites as follow:*

```js
"rewrites": [
  {
    "function": "angularUniversalFunction",
    "source": "**"
  }
]
```

The Dipesh Bhoir article shows doing this:

```js
"rewrites": [
  {
    "source": "**",
    "function": "ssr"
  }
]
```

Funny that that rewrites section was completely removed by the init and replaced with a functions section.  Guess we need both?

Then finish the steps to copy the dist for the functions, and run the nx version of npm run build:all

```txt
nx run trendy:build:all
```

But that's not going to work.  That is the build section in the workspace trendy section, not from the package.json which the article assumes.  This will take some more work.

Going to stash this work in a ssr-dipesh-bhoir-method branch.

## "Nx Nrwl Firebase Functions" by Damian Bielecki

Worth looking at [this article](https://medium.com/mean-fire/nx-nrwl-firebase-functions-98f96f514055) "Nx Nrwl Firebase Functions" by Damian Bielecki.

It's 2019, and a 3 minute read which means it should take me about three days to get through at my meticulous rate.

*The problem: When you initialize Firebase Functions with firebase init it creates functions subdirectory with its own package.json and node_modules. That is not good.*

Yeah, I know.  I finally got that sucker installed.

```txt
ng g @nrwl/node:application functions
```

It calls for more than the firebase cli apparently:

```txt
yarn add firebase firebase-admin firebase-functions
```

It's recommended that we understand what Firebase Functions are.  Sorry about that one.  I don't do pay walls well.  The AWS CDK is more my style.  Maybe someday.

Next, firebase.json currently has this:

```json
  "functions": {
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run lint",
      "npm --prefix \"$RESOURCE_DIR\" run build"
    ]
  }
```

The Damian Bielecki calls for this:

```json
  "functions": {
    "predeploy": [
      "yarn lint functions",
      "yarn build functions --prod"
    ],
    "source": "/"
  }
```

*Serving Firebase Functions is a little more complicated than typical node app.*

```txt
npm install concurrently --save-dev
```

But there is no example of how to test or deploy this method.

```txt
nx run functions:serve
```

Doesn't seem to do anything.

```txt
nx run functions:firebase
```

Since there is no change shown to the workspace.json/angular.json, how is it used?

And, the functions app simply has this:

```js
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
```

Doesn't look like it's serving an ssr deployment to me.

Oh right, the title is only: Nx Nrwl Firebase Functions.

That would be up to me.

## Back to basics

- A server program needs to call Universal's renderModule() function.

- Universal applications use the Angular platform-server package (as opposed to platform-browser), which provides server implementations of the DOM, XMLHttpRequest, and other low-level features that don't rely on a browser.  The ngExpressEngine() function is a wrapper around Universal's renderModule()

We have neither of those functions in our app at the moment.

The platform-server is in the main.server.ts file.

export { renderModule, renderModuleFactory } from '@angular/platform-server';

## The articles tried so far

The Benjamin Cabanes approach that resulted in the trendy-ssr app that doesn't work due to the error: Module parse failed: 'with' in strict mode: https://blog.nrwl.io/nx-workspace-schematics-server-side-rendering-ssr-with-angular-universal-afc04ead55

The Gregor Srdic article about his Ibex hiking website development: https://medium.com/@gregor.srdic/using-server-side-rendering-ssr-with-angular-6-universal-and-firebase-7f3206618907

The above points to this 2018 article:
https://hackernoon.com/deploying-angular-universal-v6-with-firebase-c86381ddd445

The copy dist method: https://bapittu.medium.com/angular-9-universal-ssr-with-firebase-and-deployment-in-cloud-function-54867020a656

The ganatan example
https://www.ganatan.com/tutorials/server-side-rendering-with-angular-universal

## The tuskdesk example

Anyhow, back to a the SSR build, it was the [Benjamin Cabanes](https://blog.nrwl.io/nx-workspace-schematics-server-side-rendering-ssr-with-angular-universal-afc04ead55) that we tried to implement with the trendy-ssr server that didn't work:

Instead of tuskdesk we use trendy, and nx instead of ng.

```txt
nx run trendy:build --configuration=production
nx run trendy:server --configuration=production
nx run trendy-ssr:serve
```

The main problem with that code is:

```js
import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from '../../../dist/trendy/browser/main';
```

```txt
ERROR in ./apps/trendy-ssr/src/main.ts
Module not found: Error: Can't resolve '../../../dist/trendy/browser/main' in 'C:\Users\timof\repos\timofeysie\satisfactory\apps\trendy-ssr\src'
```

There is a dist\apps\trendy\browser\main.55651155b747d7fc81fc.js file.

So this should work:

```js
import {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
} from '../../../dist/apps/trendy/browser/main.55651155b747d7fc81fc';
```

Not very scalable, but there is a huge output now:

```txt
...
t.addEventListener("DOMContentLoaded",()=>{wu().bootstrapModule(Vx).catch(t=>console.error(t))})}},t=>{"use strict";t(t.s=268)}]);
^
ReferenceError: self is not defined
    at Object../dist/apps/trendy/browser/main.55651155b747d7fc81fc.js (C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\trendy-ssr\webpack:\dist\apps\trendy\browser\main.55651155b747d7fc81fc.js:1:1)
```

But actually, it's not in the dist/app/trendy/browser directory, but here:

dist\trendy\server\main.js

There is no 'app' in there, which seems like a mistake.  But then we are back to this error which made us give up last time:

```txt
ERROR in ./dist/trendy/server/main.js 4527:84
Module parse failed: 'with' in strict mode (4527:84)
File was processed with these loaders:
 * ./node_modules/ts-loader/index.js
You may need an additional loader to handle the result of these loaders.
|                 return !0;
|         } while (test.sel); return !1; };
>     }, 2422: module => { module.exports = { Window_run: function _run(code, file) { with (file && (code += "\n//@ sourceURL=" + file), this)
|             eval(code); }, EventHandlerBuilder_build: function build() { try {
|             with (this.document.defaultView || Object.create(null))
There was an error with the build. See above.
```

One solution mentioned here is to use the target commonjs in tsconfig.server.json.

That doesn't work for us.  Maybe update "ts-loader": "version": "5.4.5",

npm i ts-loader

+ ts-loader@9.2.5

Replaced the old version in package-lock by hand, and still that error.

Deleted node_modules and the lock, same error.

Because ERROR in ./dist/trendy/server/main.js 4527:84, that's the generated ssr server.

Can't really fix that.  This ssr mess is getting worse the deeper I get.

The copy dist method: https://bapittu.medium.com/angular-9-universal-ssr-with-firebase-and-deployment-in-cloud-function-54867020a656

## The ganatan example

Not specific to Nx, but it's a long list of files to double check against what we have.

https://www.ganatan.com/tutorials/server-side-rendering-with-angular-universal

### Install the new dependencies in package.json

npm install --save @angular/platform-server
npm install --save @nguniversal/express-engine
npm install --save express
npm install --save @nguniversal/builders
npm install --save @types/express

## nx run trendy:server-ssr

Getting clear on what commands we have and what they do here.

```txt
 > nx run trendy:server-ssr 
Required property 'browserTarget' is missing
>  NX   ERROR  Running target "trendy:server-ssr" failed
```

```txt
> nx run trendy:server-ssr:development
Compiled successfully.
>  NX   ERROR  Running target "trendy:server-ssr" failed
  Failed tasks:
  - trendy:server-ssr:development
```

```txt
> nx run trendy:server:production 
✔ Server application bundle generation complete.
Initial Chunk Files | Names         |    Size
main.js             | main          | 2.54 MB
Build at: 2021-09-11T04:08:07.626Z - Hash: b102fa39b4d8161fab41 - Time: 20638ms
>  NX   SUCCESS  Running target "server" succeeded
```

"serve:ssr": "node apps/dist/trendy/server/main.js",

should be

"serve:ssr": "node dist/apps/trendy/server/main.js",

```txt
PS C:\Users\timof\repos\timofeysie\satisfactory> node dist/server/main.js
internal/modules/cjs/loader.js:905
  throw err;
  ^
Error: Cannot find module 'C:\Users\timof\repos\timofeysie\satisfactory\dist\server\main.js'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:902:15)
    at Function.Module._load (internal/modules/cjs/loader.js:746:27)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)
    at internal/main/run_main_module.js:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
```

## Functions function

apps\functions\src\main.ts

```js
import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/server`).app();
const universal = require(`${process.cwd()}/dist/apps/trendy/browser`).app();
export const ssr = functions.https.onRequest(universal);
```

Shouldn't that path be /dist/apps/trendy/browser?

Even then,

```txt
> npm run serve:ssr
> demo-app@0.0.0 serve:ssr C:\Users\timof\repos\timofeysie\satisfactory
> node dist/apps/functions/main.js
{"severity":"WARNING","message":"Warning, FIREBASE_CONFIG and GCLOUD_PROJECT environment variables are missing. Initializing firebase-admin will fail"}
```

## Dev.to articles with @angular/fire

https://dev.to/ankitprajapati/implement-angular-server-side-rendering-and-deploy-angular-universal-app-to-firebase-with-schematics-4nin

https://dev.to/jdgamble555/deploy-angular-universal-app-to-firebase-functions-49mm

ng add @angular/fire might not work for nx, right?

That "ng add" was a big problem with @nguniversal/express-engine, in that it had to be done manually.

## nx run trendy:firebase --cmd serve

This works to serve the app locally.

The links don't work.  So is this a pre-render issue or what?

If we could get the links to work at this point, then we are in business.

The function is working: http://localhost:5001/trendy2022/us-central1/helloWorld

Maybe the copy method is the best way to go?  Wait, why don't the links works?

The copy dist method: https://bapittu.medium.com/angular-9-universal-ssr-with-firebase-and-deployment-in-cloud-function-54867020a656

It requires this copy method:

```json
  "scripts": {
    "build": "node cp-angular && tsc"
  }
```

(node:1200) UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, lstat 'C:\Users\timof\repos\timofeysie\dist\apps\trendy'

And, it deletes the build dist directory each time.  Can fix that, but what about this:

!  Error: Cannot find module 'C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\functions\main.js'. Please verify that the package.json has a valid "main" entry

That's coming from the package.json:

"main": "dist/apps/functions/main.js",

functions\dist\browser\main.ad76947d0b678368d263.js

Try this:
  "main": "functions/dist/browser/main.ad76947d0b678368d263.js",

```txt
!  We were unable to load your functions code. (see above)
   - You may be able to run "npm run build" in your functions directory to resolve this.
!  ReferenceError: self is not defined
```

## The @angular/fire option

So keep looking.  It's 3:56 am.  Week two.

```txt
> nx list @angular/fire
>  NX   NOTE  @angular/fire is not currently installed
  Use "npm install -D @angular/fire" to install the plugin.
  After that, use "npx nx g @angular/fire:init" to add the required peer deps and initialize the plugin.
```

So run the command to install the plugin: npm install -D @angular/fire

```txt
> nx list @angular/fire
>  NX  Capabilities in @angular/fire:
  GENERATORS
  ng-add : Add firebase deploy schematic
  ng-add-setup-project : Setup ng deploy
  EXECUTORS/BUILDERS
  deploy : Deploy builder
```

npx nx g @angular/fire:init

### [Deploying your Universal application on Cloud Functions for Firebase](https://github.com/angular/angularfire/blob/HEAD/docs/universal/cloud-functions.md)

Regarding the deployment, the rewrites looks like this:

```json
    "rewrites": [
      { "source": "**", "function": "universal" }
    ]
```

Previously we had this:

```json
    "rewrites": [
      {
        "source": "**",
        "function": "ssr"
      }
    ]
```

And the copying will be done like this (notice the two package.json files):

*package.json to build for Cloud Functions:*

```json
"scripts": {
  // ... omitted
  "build": "ng build && npm run copy:hosting && npm run build:ssr && npm run build:functions",
  "copy:hosting": "cp -r ./dist/YOUR_PROJECT_NAME/* ./public && rm ./public/index.html",
  "build:functions": "npm run --prefix functions build"
},
```

*Change the build script in your functions/package.json to the following:*

```json
"scripts": {
    // ... omitted
    "build": "rm -r ./dist && cp -r ../dist . && tsc",
}
```

Would the first one go in the workspace.json?  We already have a build in main package.json which is used for all the projects.

We could re-use this:

"build:ssr": "nx trendy:build && nx run trendy:server",

Still not sure if that ever gets called.  Something we really need to figure out.

nx run project:target --args='--wait=100'

## Test ssr

In a regular Angular project, this would work: npm run dev:ssr

We want to confirm angular universal implementation by looking into the page source and find rendered HTML in the page source.

In an Nx workspace, this might do it:

```txt
> nx run trendy:server-ssr 
Required property 'browserTarget' is missing
———————————————————————————————————————————————
>  NX   ERROR  Running target "trendy:server-ssr" failed
  Failed tasks:
  - trendy:server-ssr
```

```txt
    "dev:ssr": "ng run trendy:serve-ssr",
    "serve:ssr": "node dist/apps/functions/main.js",
    "build:ssr": "nx trendy:build && nx run trendy:server",
    "prerender": "nx run trendy:prerender",
```

nx run trendy:serve:ssr

Error: Cannot match any routes. URL Segment: 'Mike%2520Richards'

*The common space character is encoded as %20 as you noted yourself. The % character is encoded as %25 . The way you get %2520 is when your url already has a %20 in it, and gets urlencoded again, which transforms the %20 to %2520.*

```html
<a routerLink="/Mike%20Richards">
```

Remove the %20, and then the firebase test works.  But now, our function is blowing the deploy.  That was working in the previous commit.  Another stashed branch?

In workspace, this needs to be changed again.
"outputPath": "dist/apps/trendy/server",

And removing the %20 our of /Mike%20Richards.

Now, back to the firebase server.

```txt
nx run trendy:firebase --cmd serve
...
+  hosting: Local server: http://localhost:5000
!  Error: Cannot find module 'C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\functions\main.js'. Please verify that the package.json has a valid "main" entry
```

OK.  Routes work.  Try deploy:

```txt
> nx run trendy:firebase --cmd deploy
"BuilderProgressSchema" schema is using the keyword "id" which its support is deprecated. Use "$id" for schema ID.
=== Deploying to 'trendy2022'...
i  deploying functions, hosting
Running command: npm lint functions
Usage: npm <command>
where <command> is one of:
    access, adduser, audit, bin, bugs, c, cache, ci, cit,
...
events.js:352
      throw er; // Unhandled 'error' event
      ^
Error: spawn npm lint functions ENOENT
    at notFoundError (C:\Users\timof\AppData\Roaming\nvm\v14.17.3\node_modules\firebase-tools\node_modules\cross-env\node_modules\cross-spawn\lib\enoent.js:6:26)
  errno: 'ENOENT',
  syscall: 'spawn npm lint functions',
  path: 'npm lint functions',
  spawnargs: []
}
Error: functions predeploy error: Command terminated with non-zero exit code1
ERROR: Something went wrong in @nrwl/run-commands - Command failed: firebase deploy
———————————————————————————————————————————————
>  NX   ERROR  Running target "trendy:firebase" failed
  Failed tasks:
  - trendy:firebase
```

OK.  Fair enough.  We don't need the function for the test right now.  I just want to confirm the fix for the extra %20.  Go back up a branch to no functions.

Even on the ssr branch, the functions directory exists and causes the same problem for firebase:

```txt
+  hosting: Local server: http://localhost:5000
!  Error: Cannot find module 'C:\Users\timof\repos\timofeysie\satisfactory\functions\lib\index.js'. Please verify that the package.json has a valid "main" entry
```

The deploy also fails, but with different reasons:

```txt
> nx run trendy:firebase --cmd=deploy 
"BuilderProgressSchema" schema is using the keyword "id" which its support is deprecated. Use "$id" for schema ID.
=== Deploying to 'trendy2022'...
i  deploying functions, hosting
Running command: npm --prefix "$RESOURCE_DIR" run lint
> functions@ lint C:\Users\timof\repos\timofeysie\satisfactory\functions
> eslint --ext .js,.ts .
C:\Users\timof\repos\timofeysie\satisfactory\functions\cp-angular.js
  0:0  error  Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: cp-angular.js.
The file must be included in at least one of the projects provided
C:\Users\timof\repos\timofeysie\satisfactory\functions\dist\browser\main.ad76947d0b678368d263.js
  0:0  error  Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: dist\browser\main.ad76947d0b678368d263.js.
The file must be included in at least one of the projects provided
...
✖ 5 problems (4 errors, 1 warning)
...
npm ERR! Failed at the functions@ lint script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\timof\AppData\Roaming\npm-cache\_logs\2021-09-13T17_51_57_315Z-debug.log
events.js:352
      throw er; // Unhandled 'error' event
      ^
Error: spawn npm --prefix "%RESOURCE_DIR%" run lint ENOENT
    at notFoundError (C:\Users\timof\AppData\Roaming\nvm\v14.17.3\node_modules\firebase-tools\node_modules\cross-env\node_modules\cross-spawn\lib\enoent.js:6:26)
...
```

Remove the functions section from the firebase.json, and there is still functions being called.

Well, just delete the functions directory?  That seems to work.  Then, interestingly enough, firebase serve results in a blank screen.  Was it really relying on the function now for hosting?  What gives?

And how did the functions directory get there in the first place?  What was the last time the deploy worked?  Stashing that changes shows this: *Saved working directory and index state WIP on ssr: c15ec5e reran firebase init and added functions*

Undo that change and move up to the main branch.  I'm happy to say, that then the deployments to firebase have working links.

I'm sorry to say that there is only one link now.  The other two links are tied up with the ssr/functions branches.  Repair?  Why not.  On a separate branch.  Since that was all failing, and we were about to start over with the angularfire package, couldn't hurt.
