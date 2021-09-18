# Angularfire solution

After the saga detailed in the Trendy SSR markdown file, the discussion has moved here to stop that file from growing to long.  But this is a continuation of the SSR work discussed and abandoned there.

[AngularFire](https://github.com/angular/angularfire) is the official Angular library for Firebase].

There are four areas of interest for this project:

## Deploying your application

*Firebase Hosting is production-grade web content hosting for developers. With Hosting, you can quickly and easily deploy web apps and static content to a global content delivery network (CDN) with a single command.*

Since we don't want regular hosting, I think we will skip this section for now.

## Deploy your application on Firebase Hosting

Server-side rendering
Angular Universal is a technology that allows you to run your Angular application on a server. This allows you to generate your HTML in a process called server-side rendering (SSR). AngularFire is compatible with server-side rendering; allowing you to take advantage of the Search Engine Optimization, link previews, the performance gains granted by the technology, and more. Learn more about Angular Universal.

[Getting started with Angular Universal](https://github.com/angular/angularfire/blob/master/docs/universal/getting-started.md)
Deploying your Universal application on Cloud Functions for Firebase
Prerendering your Universal application

## Getting started with Angular Universal

 Universal application on Cloud Functions for Firebase
Prerendering your Un

npm install --save-dev @nguniversal/express-engine @nguniversal/module-map-ngfactory-loader express webpack-cli ts-loader ws xhr2

Create a server.ts and webpack.server.config.js file.

The problem we will have is the use of scripts in package.json and the lack of an angular.json file.

```json
"build": "ng build && npm run build:ssr",
```

This will have to be run via a target in the workspace.json file.  Now, how does that work?  Time to sort that out.

### Calling a script from the workspace.json

[This page](https://nx.dev/latest/node/workspace/run-script) doesn't say much, but has a link 

Call the new build script gbuild, and run this:

```txt
nx run trendy:gbuild
ERROR  Cannot find target 'gbuild' for project 'trendy'
```

How to do this?  Someone asked [this question 28 days ago](https://stackoverflow.com/questions/68815938/angular-nrwl-nx-how-to-run-additional-custom-build-scripts-on-a-ui-library) with no answers yet.

Maybe I will be able to answer that soon.

@nrwl/workspace:run-script
Run an npm script using Nx

The [Nx workspace schematics: server side rendering (SSR) with Angular Universal](
https://blog.nrwl.io/nx-workspace-schematics-server-side-rendering-ssr-with-angular-universal-afc04ead55) by Benjamin Cabanes shows the following:

*a new architect target to our tuskdesk-ssr in angular.json*

```json
// projects > tuskdesk-ssr > architect > serve-all
"serve-all": {
  "builder": "@angular-devkit/architect:concat",
  "options": { 
    "targets": [
      { "target": "tuskdesk:build" },
      { "target": "tuskdesk:server" },
      { "target": "tuskdesk-ssr:serve" }
    ]
  }
}
```

*Then we can run the following command:* ng run trendy:serve-all

So modify that, and we have:

```json
  "targets": {
    "serve-all": {
      "builder": "@angular-devkit/architect:concat",
      "options": {
        "targets": [
          { "target": "trendy:build" },
          { "target": "trendy:webpack:ssr" },
          { "target": "trendy:serve:ssr" }
        ]
      }
    },
  ...
```

```txt
> nx run trendy:serve-all 
⠋ Generating browser application bundles...Another process, with id 15836, is currently running ngcc.
Waiting up to 250s for it to finish.
(If you are sure no ngcc process is running then you should delete the lock-file at C:/Users/timof/repos/timofeysie/satisfactory/node_modules/@angular/compiler-cli/ngcc/__ngcc_lock_file__.)
Compiling @angular/material/input : es2015 as esm2015
Compiling @angular/material/card : es2015 as esm2015
Compiling @angular/material/button : es2015 as esm2015
Compiling @angular/material/sidenav : es2015 as esm2015
Error: Failed to compile entry-point @angular/material/input (`es2015` as esm2015) due to compilation errors:
node_modules/@angular/material/form-field/form-field-module.d.ts:8:22 - error NG6002: Appears in the NgModule.imports of MatInputModule, but could not be resolved to an NgModule class.

This likely means that the library (@angular/material/form-field) which declares MatFormFieldModule has not been processed correctly by ngcc, or is not compatible with Angular Ivy. Check if a newer version of the library is available, and update if so. Also consider checking with the library's authors to see if the library is expected to be compatible with Ivy.

8 export declare class MatFormFieldModule {
                       ~~~~~~~~~~~~~~~~~~
node_modules/@angular/material/core/common-behaviors/common-module.d.ts:31:22 - error NG6002: Appears in the NgModule.imports of MatInputModule, but could not be resolved to an NgModule class.

This likely means that the library (@angular/material/core) which declares MatCommonModule has not been processed correctly by ngcc, or is not compatible with Angular Ivy. Check if a newer version of the library is available, and update if so. Also consider checking with the library's authors to see if the library is expected to be compatible with Ivy.
```

[MatToolbar throws error when using it with Angular 9](https://stackoverflow.com/questions/61079125/mattoolbar-throws-error-when-using-it-with-angular-9)

*I had imported MatDatePicker instead of importing MatDatePickerModule in the app.module.ts file. So, check that you have imported MODULE not Component in your module file.*

This is not the answer, as all the errors are for modules: MatLineModule, MatListModule

*You may want bundle the dependency when you are building the application. [From: In version 9](https://angular.io/guide/ivy#speeding-up-ngcc-compilation), the server builder which is used for App shell and Angular Universal has the bundleDependencies option enabled by default. If you opt-out of bundling dependencies you will need to run the standalone Angular compatibility compiler (ngcc).*

[This issue](https://stackoverflow.com/questions/62445723/matcheckbox-has-not-been-processed-correctly-by-ngcc-or-is-not-compatible-with)

Shows using a postinstall fix.  So instead of this:

"postinstall": "ngcc --properties es2015 browser module main",

Trying this:

"postinstall": "ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points"

Then run npm i again.

This time it all runs, but fails at the end:

```txt
Project target does not exist.
———————————————————————————————————————————————
>  NX   ERROR  Running target "trendy:serve-all" failed
```

[Another answer to a different issue](https://stackoverflow.com/questions/57111480/angular8-ng-run-project-target-does-not-exist-when-using-i18n) says the problem is:

1 - you are missing architect config in angular.json file.
2 - There is a problem at your browserTarget. The target must point to the project, not to Angular.

Tried #1 with the same error.  Instead of in the targets section, I created an architect section with the build stuff shown above.

This is not ideal either:

```json
    "build": "nx build",
    "gbuild": "ng build && npm run build:ssr",
```

But naming aside will not change the issue.  #2 above shows an architect section in the angular.json file which has server, server-ssr, and prerender.  In the targets section of the workspace.json, we have the server section, but not the other two.

We need to look at the sample code from those tutorials to see what the server-ssr and prerender sections should be for the workspace.json.

In the comments on [Nx workspace schematics: server side rendering (SSR) with Angular Universal](
https://blog.nrwl.io/nx-workspace-schematics-server-side-rendering-ssr-with-angular-universal-afc04ead55) by Benjamin Cabanes, Jared Christensen says 8 months ago "I ran into some issues with this article. I documented what worked for me [here](https://jareddesign.medium.com/angular-universal-server-side-rendering-ssr-in-nrwl-nx-fdb94d7953e).  He actually has [the project source on GitHub](https://github.com/jared-christensen/nx-angular-universal).

But currently, in the dist directory there is this:

dist/app/trendy/server/main.js

It should be "apps", not "app", but I can't see where that error is.

This project is looking less and less like a viable option.  Given the complexity of Nx with a generic workspace.json and SSR hosting, it might be time to get a working example and do incremental development from there, instead of trying to implement it from a non-working standpoint here.

This project can continue to hold the trends frontend and backend stack which could be used to kickoff a new trend without having to worry about the ssr needs ot the publishable app.

But choosing [this example app](https://github.com/angular/angularfire/tree/master/samples/compat) is also not a good idea, as it says: This project was generated with Angular CLI version 9.0.5.

So what is the best working starting point?

[This issue](https://github.com/angular/angularfire/issues/2730) on the Angularfire GitHub states the issues well.

*Currently the docs provided for running universal with firebase have not been updated in over 2 years. Comparing the code provided there with the sample project in this repo, it's easy to spot some differences.*

Someone points to the [deploy docs](https://github.com/angular/angularfire/blob/master/docs/deploy/getting-started.md).

The [quickstart](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md) shows a lot of database setup we don't want right now:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>',
    appId: '<your-app-id>',
    measurementId: '<your-measurement-id>'
  }
};
```

However, we do want to support voting.  This would have to be supported by a db.  The idea first is to validate the seo ability to get images at the top of image searches, nothing else.
