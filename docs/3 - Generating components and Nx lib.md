# 3 - Generating components and Nx lib

## 1. Generate our first Nx lib

```txt
>nx g lib --help
nx generate @nrwl/angular:lib [name] [options,...]
Options:
  --name                  Library name
  --directory             A directory where the lib is placed
  --publishable           Generate a publishable library.
  --buildable             Generate a buildable library.
  --prefix                The prefix to apply to generated selectors.
  --skipFormat            Skip formatting files
  --simpleModuleName      Keep the module name simple (when using --directory)
  --addModuleSpec         Add a module spec file.
  --skipPackageJson       Do not add dependencies to package.json.
  --skipTsConfig          Do not update tsconfig.json for development experience.
  --routing               Add router configuration. See lazy for more information.
  --lazy                  Add RouterModule.forChild when set to true, and a simple array of routes when set to false.
  --parentModule          Update the router configuration of the parent module using loadChildren or children, depending on what `lazy` is set to.
  --tags                  Add tags to the library (used for linting)
  --unitTestRunner        Test runner to use for unit tests (default: jest)
  --importPath            The library name used to import it, like @myorg/my-awesome-lib. Must be a valid npm name.
  --strict                Creates a library with stricter type checking and build optimization options.
  --linter                The tool to use for running lint checks. (default: eslint)
  --enableIvy             Enable Ivy for library in tsconfig.lib.prod.json. Should not be used with publishable libraries.
  --dryRun                Runs through and reports activity without writing to disk.
  --skip-nx-cache         Skip the use of Nx cache.
  --help                  Show available options for project target.
```

```txt
>nx generate @nrwl/angular:lib auth --routing
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular-devkit/architect@0.1200.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || ^14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular-devkit/build-angular@12.0.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || ^14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular-devkit/build-optimizer@0.1200.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || ^14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular-devkit/build-webpack@0.1200.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || ^14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular-devkit/core@12.0.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || ^14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular-devkit/schematics@12.0.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || ^14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/animations@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/common@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/compiler@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/compiler-cli@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/core@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/forms@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/language-service@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/platform-browser@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/platform-browser-dynamic@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@angular/router@12.0.0',
npm WARN EBADENGINE   required: { node: '^12.14.1 || ^14.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@ngtools/webpack@12.0.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || ^14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@schematics/angular@12.0.0',
npm WARN EBADENGINE   required: {
npm WARN EBADENGINE     node: '^12.14.1 || ^14.0.0',
npm WARN EBADENGINE     npm: '^6.11.0 || ^7.5.6',
npm WARN EBADENGINE     yarn: '>= 1.13.0'
npm WARN EBADENGINE   },
npm WARN EBADENGINE   current: { node: 'v16.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }

> demo-app@0.0.0 postinstall
> ngcc --properties es2015 browser module main


removed 1 package, and audited 1939 packages in 10s

132 packages are looking for funding
  run `npm fund` for details

37 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
CREATE libs/auth/README.md
CREATE libs/auth/tsconfig.lib.json
CREATE libs/auth/src/index.ts
CREATE libs/auth/src/lib/auth.module.ts
CREATE libs/auth/tsconfig.json
CREATE libs/auth/jest.config.js
CREATE libs/auth/src/test-setup.ts
CREATE libs/auth/tsconfig.spec.json
CREATE libs/auth/.eslintrc.json
UPDATE package.json
UPDATE workspace.json
UPDATE nx.json
UPDATE tsconfig.base.json
UPDATE .vscode/extensions.json
UPDATE jest.config.js
```

## 2. Add container and presentational components

```txt
>nx generate @nrwl/angular:component containers/login --project=auth
CREATE libs/auth/src/lib/containers/login/login.component.html
CREATE libs/auth/src/lib/containers/login/login.component.spec.ts
CREATE libs/auth/src/lib/containers/login/login.component.ts
CREATE libs/auth/src/lib/containers/login/login.component.scss
UPDATE libs/auth/src/lib/auth.module.ts
```

```txt
>nx generate @nrwl/angular:component components/login-form --project=auth
CREATE libs/auth/src/lib/components/login-form/login-form.component.html
CREATE libs/auth/src/lib/components/login-form/login-form.component.spec.ts
CREATE libs/auth/src/lib/components/login-form/login-form.component.ts
CREATE libs/auth/src/lib/components/login-form/login-form.component.scss
UPDATE libs/auth/src/lib/auth.module.ts
```

Update the auth.module.ts, app.component.html and app.module.ts files as shown.

Run the app:

```txt
>nx serve customer-portal
./apps/customer-portal/src/app/app.module.ts:5:0-36 - Error: Module not found: Error: Can't resolve '@nrwl/nx' in 'C:\Users\timof\repos\timofeysie\angular\demo-app\apps\customer-portal\src\app'

Error: apps/customer-portal/src/app/app.component.html:1:1 - error NG8001: 'router-outlet' is not a known element:
1. If 'router-outlet' is an Angular component, then verify that it is part of this module.
2. If 'router-outlet' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.

1 <router-outlet></router-outlet>
  ~~~~~~~~~~~~~~~

  apps/customer-portal/src/app/app.component.ts:5:16
    5   templateUrl: './app.component.html',
                     ~~~~~~~~~~~~~~~~~~~~~~
    Error occurs in the template of component AppComponent.


Error: apps/customer-portal/src/app/app.module.ts:5:26 - error TS2307: Cannot find module '@nrwl/nx' or its corresponding type declarations.

5 import { NxModule } from '@nrwl/nx';
                           ~~~~~~~~~~


Error: apps/customer-portal/src/app/app.module.ts:11:12 - error NG1010: Value at position 1 in the NgModule.imports of AppModule is not a reference
  Value could not be determined statically.

 11   imports: [
               ~
 12     BrowserModule,
    ~~~~~~~~~~~~~~~~~~
...
 17     AuthModule, // added
    ~~~~~~~~~~~~~~~~~~~~~~~~
 18   ],
    ~~~

  apps/customer-portal/src/app/app.module.ts:13:5
    13     NxModule.forRoot(),
           ~~~~~~~~~~~~~~~~
    Unable to evaluate this expression statically.
  apps/customer-portal/src/app/app.module.ts:13:5
    13     NxModule.forRoot(),
           ~~~~~~~~
    Unknown reference.
```

Looking at the errors shown in VSCode.

apps\customer-portal\src\app\app.module.ts

```js
import { NxModule } from '@nrwl/nx';
```

Causes this error:

Cannot find module '@nrwl/nx' or its corresponding type declarations.ts(2307)

```js
  imports: [
    BrowserModule,
```

Value at position 1 in the NgModule.imports of AppModule is not a reference
  Value could not be determined statically.(-991010)

Had to run the following to get rid of the second error.

npm i -g @angular/cli@latest

The first error, tried this:

```txt
> npm i @nrwl/nx --save-dev
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! Found: jasmine-marbles@0.6.0
npm ERR! node_modules/jasmine-marbles
npm ERR!   jasmine-marbles@"~0.6.0" from @nrwl/angular@12.3.3
npm ERR!   node_modules/@nrwl/angular
npm ERR!     @nrwl/angular@"^12.3.3" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! dev @nrwl/nx@"*" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: jasmine-marbles@0.4.0
npm ERR! node_modules/jasmine-marbles
npm ERR!   peer jasmine-marbles@"0.4.0" from @nrwl/nx@7.8.7
npm ERR!   node_modules/@nrwl/nx
npm ERR!     dev @nrwl/nx@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\timof\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\timof\AppData\Local\npm-cache\_logs\2021-05-14T22_02_50_869Z-debug.log
```

Search on Google reveals that it might be an npm compatibility issue.

```txt
>npm --v
7.10.0
>npm i -g npm@6
added 2 packages, removed 234 packages, changed 3 packages, and audited 71 packages in 8s
found 0 vulnerabilities
>npm --v
6.14.13
```

Then this again:

```txt
npm i @nrwl/nx --save
```

That probably should have been --save-dev.

Try the serve again:

```txt
> nx serve customer-portal
> nx run customer-portal:serve:development 
⠋ Generating browser application bundles...C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\src\entry_point_finder\targeted_entry_point_finder.js:40
                throw new Error("The target entry-point \"" + invalidTarget.entryPoint.name + "\" has missing dependencies:\n" +
                ^

Error: The target entry-point "@nrwl/nx" has missing dependencies:
 - @ngrx/effects
 - @ngrx/router-store
 - @ngrx/store

    at TargetedEntryPointFinder.findEntryPoints (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\src\entry_point_finder\targeted_entry_point_finder.js:40:23)
    at C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\src\execution\analyze_entry_points.js:29:41
    at SingleProcessExecutorSync.SingleProcessorExecutorBase.doExecute (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\src\execution\single_process_executor.js:28:29)
    at C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\src\execution\single_process_executor.js:57:59
    at SyncLocker.lock (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\src\locking\sync_locker.js:34:24)
    at SingleProcessExecutorSync.execute (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\src\execution\single_process_executor.js:57:27)
    at Object.mainNgcc (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\src\main.js:74:25)
    at Object.process (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@angular\compiler-cli\ngcc\index.js:29:23)
    at NgccProcessor.processModule (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@ngtools\webpack\src\ngcc_processor.js:164:16)
    at C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@ngtools\webpack\src\ivy\host.js:128:18
    at C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@ngtools\webpack\src\ivy\host.js:58:24
    at Array.map (<anonymous>)
    at Object.host.resolveModuleNames (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\@ngtools\webpack\src\ivy\host.js:56:32)
    at actualResolveModuleNamesWorker (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\typescript\lib\typescript.js:106560:133)
    at resolveModuleNamesWorker (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\typescript\lib\typescript.js:106810:26)
    at resolveModuleNamesReusingOldState (C:\Users\timof\repos\timofeysie\angular\demo-app\node_modules\typescript\lib\typescript.js:106907:24)

———————————————————————————————————————————————

>  NX   ERROR  Running target "customer-portal:serve" failed

  Failed tasks:

  - customer-portal:serve:development
```

Missing dependencies?:

```txt
npm i @ngrx/effects @ngrx/router-store @ngrx/store
```

Then serve again and it runs.

However, I don't see the "Login works" text, just a blank screen.

Oh, right, have to go to the default route: /auth/login

This will show it: http://localhost:4200/auth/login

## 5. Add presentational component to container component

When updating the login.component.html, login.component.ts, the login.component.html has the following error for the line:

```html
<app-login-form (submit)="login($event)"></app-login-form>
```

```txt
'app-login-form' is not a known element:
1. If 'app-login-form' is an Angular component, then verify that it is part of this module.
2. If 'app-login-form' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.ngtsc(-998001)
```

Because I can see that the LoginFormComponent is already in the declarations array of the auth.module.ts file, I restarted VSCode and the error went away.

But then it comes back again.

Part of the problem is that VSCode want the component's to start with the app name:

demo-app-login-form

And so does the Angular cli.  When the component was scaffolded, it created this 

```js
selector: 'demo-app-login-form',
```

But the code sample shown in the course shows this:

```js
selector: 'app-login-form',
```

Even with the change to demo-app-login, there error is still there.  So what to do when X "is not a known element" when it is actually part of this module?  Restart VSCode.  Then the app runs and we see the "login-form works!" on the page.

But the error is still there in VSCode.  That won't do.

## 6. Add new folder for shared interfaces

libs/auth/src/lib/containers/login/login.component.ts

libs/data-models/src/authenticate.d.ts

In the updated login-form.component.ts file, we have a TS error.

libs/auth/src/lib/components/login-form/login-form.component.ts

```js
  @Output() submit = new EventEmitter<Authenticate>();
```

The output property should not be named or renamed as a native event eslint(@angular-eslint/no-output-native)

The [Rule: no-output-rename](http://codelyzer.com/rules/no-output-rename/) says:

VSCode error: *Disallows renaming directive outputs by providing a string to the decorator. See more at https://angular.io/styleguide#style-05-13*

Where is the "string to the decorator"?   @Output() is the decorator, also known as an annotation.

This example is based on a [StackOverflow answer](https://stackoverflow.com/questions/62044946/angular-9-tslint-no-output-rename):

```js
@Output() myMethod: EventEmitter<any> = new EventEmitter();
```

So moving the typing and generics to the left of the equal sign:

```js
@Output() submit: EventEmitter<Authenticate> = new EventEmitter();
```

Same error.  If I change 'submit' to 'submitForm', then the error is gone.  I guess that's the 'rename' part of the error message.

Now the manually made data-models lib is not being found:

```js
import { Authenticate } from '@demo-app/data-models';
```

VSCode error: *Cannot find module '@demo-app/data-models' or its corresponding type declarations.ts(2307)*

Here, the path shown in the GitBook was wrong.  We needed to add the 'src' directory to this path:

```js
export { Authenticate } from './src/authenticate';
```

The problem with the lib is an old one.  This is the third time I think dealing with this, so I will just past in the notes from the Clades project which was first done in the Quallasuyu project:

### Clades notes on creating a lib from Step 5

Add new folder for shared interfaces called data-models. The docs say to add this "manually in the libs folder". There were problems with this in the [Quallasyuyu](https://github.com/timofeysie/quallasuyu/blob/master/libs/data/src/index.ts) project, so going with the CLI lib creation method for now.

In that project we ran this command:

```bash
ng g lib data // create shared interfaces
```

One way would be to create another Angular library:

```bash
nx generate @nrwl/angular:lib data-models --force:true
```

But in this case we don't need it to be Angular. It would be nice to also use this in a React project at some point, so this is the simplest way to go.

```bash
nx generate lib data-models
CREATE libs/data-models/tslint.json (97 bytes)
CREATE libs/data-models/README.md (176 bytes)
CREATE libs/data-models/tsconfig.json (123 bytes)
CREATE libs/data-models/tsconfig.lib.json (172 bytes)
CREATE libs/data-models/src/index.ts (35 bytes)
CREATE libs/data-models/src/lib/data-models.ts (0 bytes)
CREATE libs/data-models/jest.config.js (246 bytes)
CREATE libs/data-models/tsconfig.spec.json (273 bytes)
UPDATE tsconfig.json (755 bytes)
UPDATE workspace.json (21511 bytes)
UPDATE nx.json (1219 bytes)
```

The workshop code shows two files added to this new lib:

```js
libs / data - models / src / authenticate.d.ts;
libs / data - models / index.ts;
```

Since we are using a slightly different approach for these data models by generating a lib with nx, we will have the following equivalent files:

```js
libslibs\data - modelsmodels\srcmodels\src\libmodels\src\lib\authenticate.d.ts;
libslibs\data - modelsmodels\srcmodels\src\libmodels\src\lib\data - models.ts;
```

Out of the box, the auth module can't import the data-models lib:

```js
import { Authenticate } from '@clades/data-models';
```

This had a red squiggly under it. Luckily, this is not my first rodeo, so I closed VSCode and opened it again and the problem was gone. TypeScript gets a little out of sync when adding new libraries that it then has to validate.

Creating the submit function as an output brings up a naming issue. This line:

```js
@Output() submit = new EventEmitter<Authenticate>();
```

Has this warning:

```js
In the class "LoginFormComponent", the output property "submit" should not be named or renamed as a native event (no-output-native)tslint(1)
```

We will think about changing that later.

Again, the standard or calling custom elements app-x-component now uses the workspace prefix. So

```html
<app-login-form></app-login-form>
```

becomes:

```html
<clades-login-form></clades-login-form>
```

### 7. Change the ChangeDetectionStrategy to OnPush

libs/auth/src/lib/containers/login/login.component.ts

## Fixing the unit tests

After it's all working and the login form is showing but not doing anything yet, the unit tests are failing:

```txt
> nx test
> nx run customer-portal:test 
 FAIL   customer-portal  apps/customer-portal/src/app/app.component.spec.ts
  AppComponent
    √ should create the app (49 ms)
    √ should have as title 'customer-portal' (8 ms)
    × should render title (8 ms)
  ● AppComponent › should render title
    TypeError: Cannot read property 'textContent' of null
      27 |     fixture.detectChanges();
      28 |     const compiled = fixture.nativeElement;
    > 29 |     expect(compiled.querySelector('h1').textContent).toContain(
      30 |       'Welcome to customer-portal!'
      31 |     );
      32 |   });
      at src/app/app.component.spec.ts:29:40
      at ZoneDelegate.Object.<anonymous>.ZoneDelegate.invoke (../../node_modules/zone.js/
      ...
Test Suites: 1 failed, 1 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
Time:        4.914 s
Ran all test suites.
———————————————————————————————————————————————
>  NX   ERROR  Running target "customer-portal:test" failed
  Failed tasks:
  - customer-portal:test
``

What should we test in the app component?  All it has is one tag:

```html
<router-outlet></router-outlet>
```

There is a [good testing Angular document](https://angular.io/guide/testing-components-scenarios) where it shows how to test the app.component which contains a router outlet.  Only it's borderline pseudo code, which means a bit of guessing to put it into practice.

That starts with declaring this mock:

```js
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}
```

For now, I will just comment this test out to get on with the course review.
