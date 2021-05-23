# Demo App

This is a sample app created following the steps in [Workshop: Enterprise Angular applications with NgRx and Nx](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/2-creating-an-nx-workspace).

## Workflow

```txt
npm run server // start the server up
nx serve customer-portal // serve the front end Angular app
nx test auth // test the Angular app
```

Currently the only route that shows anything is here: http://localhost:4200/auth/login

Login with the following info from the server/db.json:

```json
      "id": 1,
      "username": "duncan",
      "country": "australia",
      "password": "123"
```

After login, you should see the same JSON returned with the addition of a token property.

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

## A Cheat sheet of commands and changes made for the course

This should be a concise list of commands and changes that are done in each step.

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

### Questions about changes made

Remove empty functions: constructor() {} ngOnInit() {}?
Mor maybe add console logs for ones that will be filled out later?

Avoid using any such as login(authenticate: any)?

App prefixes require app name.

@Output() submit = new EventEmitter<Authenticate>() causes the error "The output property should not be named or renamed as a native event eslint(@angular-eslint/no-output-native)".  Note this used to be just a warning.

Creating the lib module with the nx cli.  Where to put the file?libs\data-models\src\lib\data-models.module.ts

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
