# Demo App

This is a sample app created following the steps in [Workshop: Enterprise Angular applications with NgRx and Nx](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/2-creating-an-nx-workspace).

## Workflow

```txt
nx serve nest-demo // start the nest server (this should be done from a regular Windows prompt)
npm run server // start the customer portal server
nx serve customer-portal // serve the front end with trends
nx serve trendy // original Tundra 64 app, now defunct
nx test auth // test the auth lib
nx test layout // test the layout lib
nx test products // test the products lib
nx test customer-portal // test the customer-portal app
nx e2e customer-portal-e2e // run the end-to-end tests
nx build customer-portal
nx build --prod customer-portal --stats-json   
npm run bundle-report-customer-portal
python apps\hugging-face\src\hello.py // run the text summary script
```

A trend search for the nest-demo looks like this:

```url
http://localhost:3333/api/images/Christina%20Applegate
```

A text search looks like this:

/api/text/:id, GET

```url
http://localhost:3333/api/text/Christina%20Applegate
```

It will write a file: array.txt

```url
Project Console: https://console.firebase.google.com/project/trendy2022/overview
Hosting URL: https://trendy2022.web.app
```

Run the server and then the customer-portal and the app will be served at: http://localhost:4200

You can also go directly to login: http://localhost:4200/auth/login

Use the following info from the server/db.json:

```json
"username": "duncan",
"password": "123"
```

After login, you should see the same JSON returned with the addition of a token property in the network tab.

## Setup

Clone the project and npm install the dependencies.

### Directories needed

These directories need to be created manually at the moment if they don't already exist.

- ./apps/toonify/src/cartooned_img/test_img
- ./apps/toonify/src/cartooned_img/gen_image
- ./apps/toonify/src/cartooned_img/cartooned_img
- ./apps/nest-demo/src/app/bart/summaries
- ./apps/nest-demo/src/app/gan/bucket
- ./articles/
- ./posts

## Text Summary Tool

To scrape the contents of an article, use the goose app:

python apps\hugging-face\src\goose.py

Add the article to summarize in the article.txt file and run it through the BART app.

python apps\hugging-face\src\bart.py

## Current versions

The first step of this project was updating the cli and libraries for the toolkit.

```txt
ng --version
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
Angular CLI: 8.3.9
Node: 16.0.0
OS: win32 x64
Angular: 12.0.0
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.1200.0
@angular-devkit/build-angular     12.0.0
@angular-devkit/build-optimizer   0.1200.0
@angular-devkit/build-webpack     0.1200.0
@angular-devkit/core              12.0.0
@angular-devkit/schematics        12.0.0
@ngtools/webpack                  12.0.0
@schematics/angular               12.0.0
@schematics/update                0.803.9 (cli-only)
rxjs                              6.6.7
typescript                        4.2.4
webpack                           5.36.2
```

npm i -g @angular/cli@latest

```txt
>ng --version
...
Angular CLI: 12.0.0
Node: 16.0.0
Package Manager: npm 7.10.0
OS: win32 x64

Angular: 12.0.0
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1200.0
@angular-devkit/build-angular   12.0.0
@angular-devkit/core            12.0.0
@angular-devkit/schematics      12.0.0
@schematics/angular             12.0.0
rxjs                            6.6.7
typescript                      4.2.4
```

## 2 - Creating an Nx Workspace

### 1. Create a new Nx workspace in your workshop folder

npx create-nx-workspace@latest
cd demo-app

### 3. Create a new app

```txt
nx generate @nrwl/angular:app --help
npm install @nrwl/angular
nx generate @nrwl/angular:app customer-portal --routing
nx serve customer-portal
git add .
git commit -m "generated customer-portal Angular app"
nx g lib --help
nx generate @nrwl/angular:lib auth --routing
nx generate @nrwl/angular:component containers/login --project=auth
nx generate @nrwl/angular:component components/login-form --project=auth
```

Update the auth.module.ts, app.component.html and app.module.ts files as shown.

Update the login.component.html, login.component.ts as shown.

Make a folder called 'data-models', add types and export the interface:
libs/data-models/src/authenticate.d.ts
libs/data-models/index.ts
libs/auth/src/lib/components/login-form/login-form.component.html
libs/auth/src/lib/components/login-form/login-form.component.ts

Add change detection.
libs/auth/src/lib/containers/login/login.component.ts

I think now a list like this is not needed.  It's best to just follow the steps and paste in the code as shown.  Each step can be confirmed and changes applied to the tutorial.

## 8 - Layout Lib and BehaviorSubjects

Branch: step-8-Layout-Lib-and-BehaviorSubjects

```txt
nx generate @nrwl/angular:lib layout
```

This time, there is not choice for sass.

```txt
nx generate @nrwl/angular:component containers/layout --project=layout
```

Does the AuthService need to be exported if the module is already exported?

```js
export * from './lib/auth.module';
export { AuthService } from './lib/services/auth.service';
```

Need to confirm this.

Next, in the "9. Add a material tool bar logic" step, this line is causing a VSCode error:

```html
<span *ngIf="!(user$ | async)">
```

```err
Async pipe results should not be negated. Use (observable | async) === (false || null || undefined) to check its value instead

eslint@angular-eslint/template/no-negated-async
(property) LayoutComponent.user$: Observable<User>
```

There were some extra styles in the app.component.scss like this:

apps\customer-portal\src\app\app.component.scss

```scss
/*
 * Remove template code below
 */
:host {
  display: block;
  font-family: sans-serif;
  min-width: 300px;
  max-width: 600px;
  margin: 50px auto;
}

.gutter-left {
  margin-left: 9px;
}
```

The margin: 50px line in particular will push down the entire app layout, so it's a good idea to just remove everything in this file.

### Fixing the tests

After the changes in step 8, it's a good idea to run all the tests and at least fix the issues.

Here is what the auth tests look like:

```txt
> nx test auth
> nx run auth:test
 PASS   auth  libs/auth/src/lib/services/auth.service.spec.ts (6.43 s)
 PASS   auth  libs/auth/src/lib/components/login-form/login-form.component.spec.ts (6.437 s)
  ● Console
    console.error
      NG0304: 'mat-card' is not a known element:
      1. If 'mat-card' is an Angular component, then verify that it is part of this module.
      2. If 'mat-card' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress 
this message.
      at logUnknownElementError (../../../packages/core/src/render3/instructions/element.ts:220:15)
```

So although the tests are all passing, the output is not great.

But actually, running the tests again with watch, as well as all the console errors like the above, there is one failure:

```txt
 FAIL   auth  libs/auth/src/lib/components/login-form/login-form.component.spec.ts (5.078 s)
  ● LoginFormComponent › should create
    Found the synthetic property @transitionMessages. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.
```

Looking at the addendum file 8a from the forked repository, there were more failed test there.

Here are the details shown there in the below section.

### Previous notes on fixing the tests

Since @transitionMessages is not found in the project, it must be part of material which we just imported above. Stopping and starting the tests and closing and opening VSCode fixes this. Or, fixes one of them. Now the only test failing is the @transitionMessages one.

We have BrowserAnimationsModule imported in the app.module.ts file. [This issue](https://github.com/angular/angular/issues/18751) is still open on the Angular GitHub.

The solution from [this blog](https://onlyangular5.blogspot.com/2018/02/complete-angular-5-tutorial-for.html): _Use (submit) instead of (ngSubmit)._

We don't have a submit in the login form component. We do have this however:

```js
@Output() submit = new EventEmitter<Authenticate>();
```

There is a TypeScript warning on this: _In the class "LoginFormComponent", the output property "submit" should not be named or renamed as a native event (no-output-native)tslint(1)_

That was noticed before. Changed submit to submitLogin and the warning is gone. Also imported these in the login.component.spec.ts file, same as the form, and added them to the imports array.

```js
import { MaterialModule } from '@clades/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
```

Now the login component has this failure:

```bash
NullInjectorError: No provider for HttpClient!
```

This requires the testing module imported and added to the array:

```js
import { HttpClientTestingModule } from '@angular/common/http/testing';
```

Now both login and login-form component specs are failing with the _Found the synthetic property @transitionMessages._.

Import both MaterialModule and BrowserAnimationsModule in both failing specs and the tests pass!

### Fixing the tests again for this project

The submit @Input has already been updated here, so I'm not sure what is causing the synthetic error now.

The error again:

```txt
 FAIL   auth  libs/auth/src/lib/components/login-form/login-form.component.spec.ts
  ● LoginFormComponent › should create
    Found the synthetic property @transitionMessages. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.
```

Another concern is that the material tags like ```<mat-card>``` in the login-form.component.html file are all showing errors like this:

```txt
'mat-card-title' is not a known element:
1. If 'mat-card-title' is an Angular component, then verify that it is part of this module.
2. If 'mat-card-title' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.ngtsc(-998001)
```

After including the material.module in the imports of the login-form.component.spec and the layout.component.spec, and then running the tests in a separate command prompt terminal (not in the VSCode terminal) all the tests are passing.  Byt there are still these messages on every test being run:

```txt
  console.error
    NG0304: 'demo-app-layout' is not a known element:
```

It looks like there is an [open issue on the Angular GitHub](https://github.com/angular/angular-cli/issues/18177) for this right now.  Have to keep an eye on that.

### Fixing the end-to-end tests

This time we are going to be adding the end-to-end tests of the customer-portal app.

To run those, use this command: nx e2e customer-portal-e2e.

You will see an output like this:

```txt
>nx e2e customer-portal-e2e
> nx run customer-portal-e2e:e2e
- Generating browser application bundles...
√ Browser application bundle generation complete.
...
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
√ Compiled successfully.
It looks like this is your first time using Cypress: 6.9.1
[11:44:08]  Verifying Cypress can run C:\Users\timof\AppData\Local\Cypress\Cache\6.9.1\Cypress [started]
[11:44:18]  Verified Cypress! C:\Users\timof\AppData\Local\Cypress\Cache\6.9.1\Cypress [title changed]
[11:44:18]  Verified Cypress! C:\Users\timof\AppData\Local\Cypress\Cache\6.9.1\Cypress [completed]
...
  customer-portal
    1) should display welcome message
  0 passing (5s)
  1 failing
  1) customer-portal
       should display welcome message:
     AssertionError: Timed out retrying after 4000ms: Expected to find element: `h1`, but never found it.
      at getGreeting (http://localhost:4200/__cypress/tests?p=src\integration\app.spec.ts:6:30)
```

The failing tests are in this file:

apps\customer-portal-e2e\src\integration\app.spec.ts

```js
import { getGreeting } from '../support/app.po';
describe('customer-portal', () => {
  beforeEach(() => cy.visit('/'));
  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to customer-portal!');
  });
});
```

apps\customer-portal-e2e\src\support\app.po.ts

```js
export const getGreeting = () => cy.get('h1');
```

If we change 'h1' to '.title', adding a title class to the layout.component.html

```html
<span class="title">Customer Portal</span>
```

And update the string in the contains function of the app.spec.ts file like this:

```js
getGreeting().contains('Customer Portal');
```

Then that test will pass.

When login is working, we can come back here and make a test for that to show that the login routing works, etc.

Right now, the server reports either an "unknown error" if the server is not running, "Unauthorized" if the email/password are wrong, and a JSON response with a fictional user-token at the moment.

That will be updated in the next section, step 9 - Route Guards and Products Lib.

### 11 - Adding NgRx to Nx App

Branch: step-11-Adding-NgRx-to-Nx-App

Create a products store as the root state without a facet.

```txt
nx g @nrwl/angular:ngrx --module=apps/customer-portal/src/app/app.module.ts  --minimal true
? What name would you like to use for the NgRx feature state? An example would be "users". products
? Is this the root state of the application? Yes
? Would you like to use a Facade with your NgRx state? No
✔ Packages installed successfully.
UPDATE apps/customer-portal/src/app/app.module.ts
UPDATE package.json
```

Add NgRx Auth lib making it a state state

```text
nx g @nrwl/angular:ngrx --module=libs/auth/src/lib/auth.module.ts --minimal false
? What name would you like to use for the NgRx feature state? An example would be "users". auth
? Is this the root state of the application? No
? Would you like to use a Facade with your NgRx state? No
CREATE libs/auth/src/lib/+state/auth.actions.ts
CREATE libs/auth/src/lib/+state/auth.effects.spec.ts
CREATE libs/auth/src/lib/+state/auth.effects.ts
CREATE libs/auth/src/lib/+state/auth.models.ts
CREATE libs/auth/src/lib/+state/auth.reducer.spec.ts
CREATE libs/auth/src/lib/+state/auth.reducer.ts
CREATE libs/auth/src/lib/+state/auth.selectors.spec.ts
CREATE libs/auth/src/lib/+state/auth.selectors.ts
UPDATE libs/auth/src/lib/auth.module.ts
UPDATE libs/auth/src/index.ts
```

The current tutorial only has action, state and reducer classes with spec tests created.  As you can see from above, there is also model and reducers along with a module and index not shown in the current image.  I have an updated image for this.

### 12 - Strong Typing the State and Actions

Branch: step-12-Strong-Typing-the-State-and-Actions

1. Add Login Action Creators

The create reducer function has some issues out of the box:

```js
const authReducer = createReducer(
  initialState,
  on(AuthActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(AuthActions.loadAuthSuccess, (state, { auth }) =>
    authAdapter.setAll(auth, { ...state, loaded: true })
  ),
  on(AuthActions.loadAuthFailure, (state, { error }) => ({ ...state, error }))
);
```

The functions init(), loadAuthSuccess(), and loadAuthFailure() don't exist on AuthActions.

libs/auth/src/lib/+state/products.selectors.ts

At the end of this step, there will be errors in the auth.effects.ts file because the default created actions no longer exist:

```ts
AuthActions.init),
AuthActions.loadAuthSuccess({ auth: [] });
AuthActions.loadAuthFailure
```

One solution would be to leave the old actions there until the new ones are done.
We could leave a not at the end pointing this out.
Or just move on to the next.

After this, section notes were created in the docs directory.  The idea was to create a bare bones list of scaffolding commands and changes made to allow for a fast upgrade next time.  The scaffolding commands are an easy part, but the changes made to the files to create all the functionality is not really worth it.  The course already does that.

The scaffolding commands could be used when for example doing a technical test where a mature framework must be quickly setup to then address some key business logic.

### 14 - NgRx Selectors & 15 - Add Products NgRx Feature Module

Branch: step-14-NgRx-Selectors

Right at the start there is something strange.  There is already a selector file:
libs\auth\src\lib\+state\auth.selectors.ts

The instructions then say:

1. Add selector file

Add a file called index.ts to the +state folder of your auth state lib

libs/auth/src/lib/+state/products.selectors.ts

```js
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, ProductsData } from './products.reducer';
import * as fromProduct from './products.reducer';

const getProductsState = createFeatureSelector<ProductsData>('products');

const getProducts = createSelector(
  getProductsState,
  state => state.products
);

export const productsQuery = {
  getProducts,
};
```

So we need *another* selector file?  Shouldn't this be going into the products lib?

My notes from last year say: *it seems to me that section 14 should be in section 15 after the products lib is created. I would like to introduce the product modules scaffolding command in section 14, talking about a selector there, and then working on the rest of the product module in section 15.*

Duncan agreed with this idea, so it's time to move the scaffolding for products into step 14.

The only other item in step 14 is: Use selector in Layout component

This will have to be moved somewhere into 15.

The old scaffolding command was:

ng generate ngrx products --module=libs/products/src/lib/products.module.ts

```txt
> nx g @nrwl/angular:ngrx --module=libs/products/src/lib/products.module.ts --minimal false
√ What name would you like to use for the NgRx feature state? An example would be "users". · products
√ Is this the root state of the application? (y/N) · false
√ Would you like to use a Facade with your NgRx state? (y/N) · false
CREATE libs/products/src/lib/+state/products.actions.ts
CREATE libs/products/src/lib/+state/products.effects.spec.ts
CREATE libs/products/src/lib/+state/products.effects.ts
CREATE libs/products/src/lib/+state/products.models.ts
CREATE libs/products/src/lib/+state/products.reducer.spec.ts
CREATE libs/products/src/lib/+state/products.reducer.ts
CREATE libs/products/src/lib/+state/products.selectors.spec.ts
CREATE libs/products/src/lib/+state/products.selectors.ts
UPDATE libs/products/src/lib/products.module.ts
UPDATE libs/products/src/index.ts
```

### Questions about changes made

Remove empty functions: constructor() {} ngOnInit() {}?
Mor maybe add console logs for ones that will be filled out later?

Avoid using any such as login(authenticate: any)?

App prefixes require app name.  So I have changed for example 'app-layout' to 'demo-app-layout' where appropriate.

@Output() submit = new EventEmitter<Authenticate>() causes the error "The output property should not be named or renamed as a native event eslint(@angular-eslint/no-output-native)".  Note this used to be just a warning.

Creating the lib module with the nx cli.  Where to put the file?libs\data-models\src\lib\data-models.module.ts

Replace the file system picture from the New Nx Lib with State folder at gitbook/assets/image%20%2823%29.png.

Propose putting the unit test and e2e sections at the bottom of their respective steps instead of in unused files.

## Original DemoApp Readme

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Powerful, Extensible Dev Tools**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@demo-app/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
