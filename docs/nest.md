# Nest

## Nest CLI commands

```txt
npm install -D @nrwl/nest
nx generate @nrwl/nest:application nest-demo
nx serve nest-demo
nx generate @nrwl/nest:application nest-demo --frontendProject customer-portal
nx build nest-demo
nx generate @nrwl/nest:library nest-lib
nx generate @nrwl/nest:library <nest-lib> [--controller] [--service] [--global]
```

Any commands that can be used with the Nest CLI can also be used with the nx command. The --sourceRoot flag should be used for all Nest generators.  The --sourceRoot command should point to the source directory of a Nest library or application within an Nx workspace.

```txt
nest g resource users
```


## Scaffolding the app

```txt
> nx generate @nrwl/nest:application nest-demo --frontendProject customer-portal
CREATE apps/nest-demo/src/app/.gitkeep
CREATE apps/nest-demo/src/assets/.gitkeep
CREATE apps/nest-demo/src/environments/environment.prod.ts
CREATE apps/nest-demo/src/environments/environment.ts
CREATE apps/nest-demo/src/main.ts
CREATE apps/nest-demo/tsconfig.app.json
CREATE apps/nest-demo/tsconfig.json
CREATE apps/nest-demo/.eslintrc.json
CREATE apps/nest-demo/jest.config.js
CREATE apps/nest-demo/tsconfig.spec.json
CREATE apps/customer-portal/proxy.conf.json
CREATE apps/nest-demo/src/app/app.controller.spec.ts
CREATE apps/nest-demo/src/app/app.controller.ts
CREATE apps/nest-demo/src/app/app.module.ts
CREATE apps/nest-demo/src/app/app.service.spec.ts
CREATE apps/nest-demo/src/app/app.service.ts
UPDATE workspace.json
UPDATE nx.json
UPDATE package.json
UPDATE .vscode/extensions.json
UPDATE jest.config.js
UPDATE tsconfig.base.json
```

## Nest Architecture

- app.controller.ts: Controller file that will contain all the application routes.
- app.controller.spec.ts: This file would help writing out unit tests for the controllers.
- app.module.ts: The module file essentially bundles all the controllers and providers of your application together.
- app.service.ts: The service will include methods that will perform a certain operation. For example: Registering a new user.
- main.ts: The entry file of the application will take in your module bundle and create an app instance using the NestFactory provided by Nest.
