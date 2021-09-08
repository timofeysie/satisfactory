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

Worth looking at [this article](https://medium.com/mean-fire/nx-nrwl-firebase-functions-98f96f514055) "Nx Nrwl Firebase Functions" by Damian Bielecki.

It's 2019, and a 3 minute read which means it should take me about three days to get through at my meticulous rate.

*The problem: When you initialize Firebase Functions with firebase init it creates functions subdirectory with its own package.json and node_modules. That is not good.*

Yeah, I know.  I finally got that sucker installed.

It calls for more than the firebase cli apparently:

```txt
yarn add firebase firebase-admin firebase-functions
```

It's recommended that we understand what Firebase Functions are.  Sorry about that one.  I don't do pay walls well.  The AWS CDK is more my style.  Maybe someday.

