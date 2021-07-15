# Nest

Your friendly neighborhood [Nest](https://docs.nestjs.com/) backend.

## Nest CLI commands

```txt
npm install -g @nestjs/cli
npm install -D @nrwl/nest
nx generate @nrwl/nest:application nest-demo
nx serve nest-demo
nx generate @nrwl/nest:application nest-demo --frontendProject customer-portal
nx build nest-demo
nx generate @nrwl/nest:library nest-lib
nx generate @nrwl/nest:library <nest-lib> [--controller] [--service] [--global]
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

## Scaffold an api

Any commands that can be used with the Nest CLI can also be used with the nx command. The --sourceRoot flag should be used for all Nest generators.  The --sourceRoot command should point to the source directory of a Nest library or application within an Nx workspace.

```txt
nest g resource login --sourceRoot apps/nest-demo/src/
nx generate @nrwl/nest:generate resource nest-demo --sourceRoot apps/nest-demo/src/
```

```txt
> nest generate resource nest-demo
"SchematicsNestResource" schema is using the keyword "id" which its support is deprecated. Use "$id" for schema ID.
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? No
CREATE src/nest-demo/nest-demo.controller.spec.ts (598 bytes)
CREATE src/nest-demo/nest-demo.controller.ts (230 bytes)
CREATE src/nest-demo/nest-demo.module.ts (270 bytes)
CREATE src/nest-demo/nest-demo.service.spec.ts (475 bytes)
CREATE src/nest-demo/nest-demo.service.ts (92 bytes)
UPDATE package.json (3080 bytes)
✔ Packages installed successfully.
```

Not what we want.

```txt
> nx generate @nrwl/nest:application resource nest-demo --sourceRoot apps/nest-demo/src/
CREATE apps/resource/src/app/.gitkeep
CREATE apps/resource/src/assets/.gitkeep
CREATE apps/resource/src/environments/environment.prod.ts
CREATE apps/resource/src/environments/environment.ts
CREATE apps/resource/src/main.ts
...
```

Also not what we want.

Google: nx "--sourceRoot" "generate resource"

ng generate @nestjs/schematics:resource --name=team --path=src/app --sourceRoot=apps/server --no-interactive --dry-run

nx generate @nestjs/schematics:resource nest-demo --sourceRoot apps/nest-demo/src/app --dry-run

nx generate @nestjs/schematics:resource login --sourceRoot apps/nest-demo/src/app

With this method, a new directory is created.  Then we have to replace the app module with the nest demo module.

apps\nest-demo\src\main.ts

Is there a way to add the crud functions to the app module?

```txt
nx generate @nestjs/schematics:resource app --sourceRoot apps/nest-demo/src
A merge conflicted on path "/apps/nest-demo/src/app/app.controller.spec.ts".
```

Nope.  So it's back to replacing the app module.

```txt
> nx generate @nestjs/schematics:resource login --sourceRoot apps/nest-demo/src/app
...
nx serve nest-demo
```

Goto http://localhost:3333/api/login

It's a start.  Add products and we should have a better demo backend.

But how to configure products and login at the same time?

Actually, I don't need to modify the main.ts file at all.  The login module is wired into the app.module, and it supports both api out of the box.  Cool.

http://localhost:3333/api

http://localhost:3333/api/login

Now, to support the login, we want the post to accept a body.  I'm guessing that will go in the CreateLoginDto?
