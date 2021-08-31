# Trendy Client

## Getting started

The plan is that this will be the SEO SSR client to hold the images and other front end public facing behavior.  Let's start with a list.

- SEO
- SSR
- Ads
- Analytics
- SN sharing
- Voting
- Images
- Deployments
- Hosting

Wow, that's a lot.  I haven't seen it myself like this yet, so just digesting that this is not going to get done as quickly as I first imagined.  I am usually optimistic at estimating.  But putting on my PM hat, that's about nine months of work there if each is a month.  But no, I think Ads and Analytics are both weekend jobs.  If this can be finished by December, I will be happy.

There is still a lot to work out too.  I'm still not sure how the images work with the first two.  Can we pull them from a db and still have good SEO/SSR?

It would be nice to re-use the layout module for this.  We won't need auth.  So the scaffolding will be simpler.  Not sure if we even need NgRx, as there is no login.  The product list is not a big deal.  Not sure if sorting is needed or wanted.  Not sure how the UI is even going to look beyond the header, the ad fields and the image cards.

Voting should however have NgRx, so may as well think about how that's going to work.

Lets get the links here that were put in the notes.  I did all this research at the beginning, so now, after the ML phase is cooling off, all will have to be gone over again.

### Angular seo

https://yoast.com/image-seo/

https://www.webceo.com/blog/how-to-do-seo-for-news-websites/#6_get_featured_in_google_news

https://aglowiditsolutions.com/blog/angular-seo/amp/

Use title and meta data

ng add @nguniversal/express-engine --clientProject project-name

npm run build:SSR && npm run serve:SSR

npm run prerender on the project and use guess-parser to guess the application’s routes

### Nx SSR

The next step is doing this in Nx using the [Angular Universal server-side rendering (SSR) in Nrwl Nx by Jared Christensen](https://jareddesign.medium.com/angular-universal-server-side-rendering-ssr-in-nrwl-nx-fdb94d7953e) article.

Generating the app in the Christensen approach looks like this:

```sh
nx generate @nrwl/angular:app MyApp
```

Generating the app in the Duncan looked like this:

```sh
nx generate @nrwl/angular:app customer-portal --routing
```

Going with this:

```sh
nx generate @nrwl/angular:app trendy --routing
```

This brings up the difference between CamelCase or snake-case (also called kebab-case).  Apparently, the Angular CLI recognizes the options written in either case, so there.

What is the Angular Express Engine?  It's for SSR.  Don't overthink it.  There is a lot to get through.

```sh
npx ng add @nguniversal/express-engine --clientProject trendy
```

This would be the nx method?

```sh
nx add @nguniversal/express-engine --clientProject my-app
```

[This article](https://blog.nrwl.io/nx-workspace-schematics-server-side-rendering-ssr-with-angular-universal-afc04ead55) by
Benjamin Cabanes shows using a specific schematic for it.

```sh
yarn add @nguniversal/express-engine @nguniversal/module-map-ngfactory-loader
```

```sh
ng generate @schematics/angular:universal --clientProject=tuskdesk
```

The second article includes provideModuleMap.  This is used for the server which will serve the app.  Are we serving the app?  That remains to be seen?  I thought NodeJS was not suited for serving large things like an Angular app, but only for small API requests?

The official [docs](https://angular.io/start/start-deployment) say:

*Copy the contents of the dist/my-project-name folder to your web server. Because these files are static, you can host them on any web server capable of serving files; such as Node.js, Java, .NET, or any backend such as Firebase, Google Cloud, or App Engine. For more information, see Building & Serving and Deployment.*

There are three links to Google there.  I guess they developed Angular, so that makes sense.  But we want the free option.  How about the Heroku solution?  But wait, we are trying to optimize for a Google image search.  Would they give a slight edge to hosting on their server?  Good point.  I might have a use for that Google Cloud account I created and then walked away from when I saw the monthly cost of a ML backed Jupyter notebook instance.

There is actually a [community plugin](https://www.npmjs.com/package/@simondotm/nx-firebase) for firebase.  It should work for hosting.  I'm sorry it's not an official plugin, but I get that they can't support everything.

The is also [Nxtend](https://nxtend.dev/docs/firebase/getting-started/) which looks more mature, given they have Ionic/Capacitor plugins and a website.

Here are the [docs for firebase hosting](https://firebase.google.com/docs/hosting).  I'm thinking this will tick a box for Google, and there are lots of boxes to tick for SEO.

So going with this for now:

```sh
npm i @nguniversal/express-engine @nguniversal/module-map-ngfactory-loader
```

Next:

```sh
nx generate @schematics/angular:universal --clientProject=trendy
```

*'clientProject' is not found in schema*

Using ng instead of nx results in this error:

*The generate command requires to be run in an Angular project, but a project definition could not be found.*

Maybe it should be --project=trendy?  Seems to work:

```sh
PS C:\Users\timof\repos\satisfactory> nx generate @schematics/angular:universal --project=trendy      
✔ Packages installed successfully.
CREATE apps/trendy/src/main.server.ts
CREATE apps/trendy/src/app/app.server.module.ts
CREATE apps/trendy/tsconfig.server.json
UPDATE package.json
UPDATE workspace.json
UPDATE apps/trendy/src/main.ts
UPDATE apps/trendy/src/app/app.module.ts
```

#### Updating build paths

There is no angular.json in our project, as we have a generic workspace.json.

```json
"outputPath": "dist/apps/trendy/browser",
```

Do we really need the "Creating our NodeJS server" from the Helgevold article?  How about just the Christensen?  Lets try without it using the extra node server.

There are some differences in the different approaches.

npm run build:ssr
npm run serve:ssr

You can now view your app in a browser at http://localhost:4000/

From the Benjamin Cabanes article:

nx run trendy:build --configuration=production

nx run trendy:server --configuration=production

The Christensen has this:

```sh
npm run serve:ssr
npm ERR! missing script: serve:ssr
```

In "Step 5: Update server distFolder" Inside of the generated server.ts file (apps > my-app > server.ts) we have no such file.  There is a main.server.ts, but it looks nothing like the one in the article.

So, back to another server.

nx generate @nrwl/node:application trendy-ssr

The code shown has this issue:

```err
Require statement not part of import statement.eslint@typescript-eslint/no-var-requires
var require: NodeRequire
(id: string) => any
```

Changed the require statement to an import thanks to the quick fix suggestion:

```js
import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from '../../../dist/trendy/server/main';
```

Then the workflow:

```sh
nx run trendy:build --configuration=production
nx run trendy:server --configuration=production
nx run trendy-ssr:serve // doesn't work
```

```txt
ERROR in ./apps/trendy-ssr/src/main.ts
Module not found: Error: Can't resolve '../../../dist/apps/trendy/server/main' in 'C:\Users\timof\repos\satisfactory\apps\trendy-ssr\src'
There was an error with the build. See above.
```

After fixing that require situation, this is a bigger error:

```err
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

*change the module target to commonjs Set the module to commonjs in your tsconfig.server.json, this however has the drawback of disabling lazy-loading on the server.*

```err
> nx run trendy:server:production 
error TS6046: Argument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'esnext'.
```

*set domino as an external dependency. In angular.json under server.options add "externalDependencies": ['domino'], this will cause domino not to be included in your server bundle, and it will be required during runtime.*

What is domino?  And we have no server.options.

### Deploy

The first idea was to deploy to Heroku with [this guide](https://www.thisdot.co/blog/deploying-nx-workspace-based-angular-and-nestjs-apps-to-heroku).  But then realizing that Google might like it more if we used Firebase (still free hopefully) then [this Nxtend doc page is the guide for that](https://nxtend.dev/docs/firebase/getting-started/)

Outside the project, run this:

npm install -g firebase-tools

firebase projects:list

```sh
npm install --save-dev --exact @nxtend/firebase
nx generate @nxtend/firebase:init
Unable to resolve @nxtend/firebase:init.
Cannot find generator 'init' in C:\Users\timof\repos\satisfactory\node_modules\@nxtend\firebase\collection.json.
nx generate @nxtend/firebase:firebase-project --project trendy
```

Workflow:

```txt
nx run trendy:firebase --cmd init
? Please select an option: Create a new project
i  If you want to create a project in a Google Cloud organization or folder, please use "firebase projects:create" instead, and return to this command when you've created the project.
? Please specify a unique project id (warning: cannot be modified afterward) [6-30 characters]:
 trendy2022
? What would you like to call your project? (defaults to your project ID) trendy
√ Creating Google Cloud Platform project
nx run trendy:firebase --cmd deploy
```

```txt
=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? dist\apps\trendy
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
+  Wrote dist\apps\trendy/index.html

Project Console: https://console.firebase.google.com/project/trendy2022/overview
Hosting URL: https://trendy2022.web.app
```

I had to move the firebase.json, .firebase/, and .firebaserc artifacts outside to the root directory to get the hosting to work.  Now we are in action, but had to add /index.html to that hosting url above.

### AdSense

1. Ni1. Create space for a leaderboard top banner.
2. Have a sidebar for a rectangular or skyscraper banner.
3. Find a spot under your main header for link units.
4. Add a horizontal banner  at end of your content.

- Use Responsive ad sizes, it adjusts with Mobile (most of your traffic)
- Use ad Border and Ad Background to your site Background. 

Always use text ads: If you want to get a high Click-through rate then you need to must add text plus link ads, they have high CPC if your traffic is coming from tier 1 countries.

Add page-level ads to your site.

Convert your Cheap traffic to premium traffic.

Source: https://www.quora.com/How-much-money-can-I-make-from-AdSense-with-1000-visitors-per-day 

1000 visitor CTR 1% = click per 100 views = 10 clicks = $15 per 1000 visitors.

4,000 visitors per day at $2, from Asian Countries = #Traffic from a Developed Country.

US/UK $7 per 1000 page views.

https://www.adpushup.com/blog/whats-causing-the-sudden-drop-in-your-adsense-earnings-ctr-and-rpm/ 

robot.txt investigation.

section targeting tags.

This is done with the following tags:

< !– google_ad_section_start –>The most relevant text, the text you want to have AdSense target when selecting ads, should be placed within these tags< !–
