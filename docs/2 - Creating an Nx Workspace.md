# 2 - Creating an Nx Workspace

## 1. Create a new Nx workspace in your workshop folder

```txt
>npx create-nx-workspace@latest
Need to install the following packages:
  create-nx-workspace@latest
Ok to proceed? (y) y
√ Workspace name (e.g., org name)     · demo-app
√ What to create in the new workspace · empty
√ Use Nx Cloud? (It's free and doesn't require registration.) · No
>  NX  Nx is creating your workspace.
  To make sure the command works reliably in all environments, and that the preset is applied correctly,
  Nx will run "npm install" several times. Please wait.
>  NX   SUCCESS  Nx has successfully created the workspace.
```

Now we have the following packages installed in the package.json:

```json
@nrwl/cli": "12.3.3",
"typescript": "~4.2.4"
```

## 3. Create a new app

```txt
>nx generate @nrwl/angular:app --help
nx generate @nrwl/angular:app [name] [options,...]
Options:
  --name                  The name of the application.
  --directory             The directory of the new application.
  --style                 The file extension to be used for style files. (default: css)
  --routing               Generates a routing module.
  --inlineStyle           Specifies if the style will be in the ts file.
  --inlineTemplate        Specifies if the template will be in the ts file.
  --viewEncapsulation     Specifies the view encapsulation strategy.
  --prefix                The prefix to apply to generated selectors.
  --skipTests             Skip creating spec files.
  --skipFormat            Skip formatting files
  --skipPackageJson       Do not add dependencies to package.json.
  --unitTestRunner        Test runner to use for unit tests (default: jest)
  --e2eTestRunner         Test runner to use for end to end (e2e) tests (default: cypress)
  --tags                  Add tags to the application (used for linting)
  --linter                The tool to use for running lint checks. (default: eslint)
  --backendProject        Backend project that provides data to this application. This sets up proxy.config.json.
  --strict                Creates an application with stricter type checking and build optimization options.
  --dryRun                Runs through and reports activity without writing to disk.
  --skip-nx-cache         Skip the use of Nx cache.
  --help                  Show available options for project target.
```

This command needs to come first.

```txt
>npm install @nrwl/angular
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
npm WARN EBADENGINE   package: '@schematics/angular@12.0.0',
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
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression when used in a Node.js environment. It is recommended you upgrade to 3.2.7 or 4.3.1. (https://github.com/visionmedia/debug/issues/797)  
added 742 packages, and audited 947 packages in 32s
61 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
```

```txt
>nx generate @nrwl/angular:app customer-portal --routing
√ Which stylesheet format would you like to use? · scss
√ Packages installed successfully.
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


removed 1 package, and audited 1939 packages in 9s

132 packages are looking for funding
  run `npm fund` for details

37 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
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


removed 1 package, and audited 1939 packages in 9s

132 packages are looking for funding
  run `npm fund` for details

37 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
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


removed 1 package, and audited 1939 packages in 9s

132 packages are looking for funding
  run `npm fund` for details

37 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
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


removed 1 package, and audited 1939 packages in 9s

132 packages are looking for funding
  run `npm fund` for details

37 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
CREATE jest.config.js
CREATE jest.preset.js
CREATE apps/customer-portal/tsconfig.editor.json
CREATE apps/customer-portal/tsconfig.json
CREATE apps/customer-portal/src/favicon.ico
CREATE apps/customer-portal/.browserslistrc
CREATE apps/customer-portal/tsconfig.app.json
CREATE apps/customer-portal/src/index.html
CREATE apps/customer-portal/src/main.ts
CREATE apps/customer-portal/src/polyfills.ts
CREATE apps/customer-portal/src/styles.scss
CREATE apps/customer-portal/src/assets/.gitkeep
CREATE apps/customer-portal/src/environments/environment.prod.ts
CREATE apps/customer-portal/src/environments/environment.ts
CREATE apps/customer-portal/src/app/app.module.ts
CREATE apps/customer-portal/src/app/app.component.html
CREATE apps/customer-portal/src/app/app.component.spec.ts
CREATE apps/customer-portal/src/app/app.component.ts
CREATE apps/customer-portal/src/app/app.component.scss
CREATE .eslintrc.json
CREATE apps/customer-portal/.eslintrc.json
CREATE apps/customer-portal/jest.config.js
CREATE apps/customer-portal/src/test-setup.ts
CREATE apps/customer-portal/tsconfig.spec.json
CREATE apps/customer-portal-e2e/cypress.json
CREATE apps/customer-portal-e2e/src/fixtures/example.json
CREATE apps/customer-portal-e2e/src/integration/app.spec.ts
CREATE apps/customer-portal-e2e/src/plugins/index.js
CREATE apps/customer-portal-e2e/src/support/app.po.ts
CREATE apps/customer-portal-e2e/src/support/commands.ts
CREATE apps/customer-portal-e2e/src/support/index.ts
CREATE apps/customer-portal-e2e/tsconfig.e2e.json
CREATE apps/customer-portal-e2e/tsconfig.json
CREATE apps/customer-portal-e2e/.eslintrc.json
UPDATE workspace.json
UPDATE package.json
UPDATE .vscode/extensions.json
UPDATE nx.json
```

```txt
>nx serve customer-portal

> nx run customer-portal:serve:development
√ Browser application bundle generation complete.

Initial Chunk Files   | Names         |      Size
vendor.js             | vendor        |   2.34 MB
polyfills.js          | polyfills     | 472.99 kB
styles.css, styles.js | styles        | 345.18 kB
main.js               | main          |  23.66 kB
runtime.js            | runtime       |   6.57 kB

                      | Initial Total |   3.17 MB

Build at: 2021-05-14T21:17:53.342Z - Hash: 8bd4ba5158d946ad4468 - Time: 10108ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


√ Compiled successfully.
√ Browser application bundle generation complete.

5 unchanged chunks

Build at: 2021-05-14T21:17:55.216Z - Hash: dc015c899f4c5b4f43c4 - Time: 1269ms

√ Compiled successfully.
```

Branch name: step-2-Creating-an-Nx-Workspace
