# Next.js with nx

<https://nx.dev/next/overview>

## npm and nx

```txt
npm install --save-dev @nrwl/next
nx g @nrwl/next:app tundra
nx g @nrwl/next:lib my-new-lib
nx g @nrwl/next:page my-new-page --project=tundra
nx g @nrwl/next:component my-new-component --project=tundra
nx serve tundra --prod
nx test tundra
nx test my-new-lib
nx e2e tundra-e2e
nx build tundra
nx export tundra
```

<https://nx.dev/guides/deploy-nextjs-to-vercel>

Of course, it's not as easy as all that.  On a Mac got the error "TypeScript not found" even though it was in the package.json.

```bash
> nx g @nrwl/next:app next
√ Which stylesheet format would you like to use? · scss
Could not automatically add the following property to jest.config.js:
projects: "<rootDir>/apps/next"
Please manually update jest.config.js
Error: s.codePointAt is not a function
originalContent.replace is not a function
```

There are no Google search hits for any of that.  What can I do?

Create a new repo and try to reproduce it to raise an issue with Nx?

Upgrade the cli to 13?

Creating a new workspace with the latest nx and preset to react works to create a working NextJS app.

However, when trying to add AMP to it, then the serve hangs.

After rolling back a bit, and restarting, the app does run again.

There is a possible issue with the versions being used in our package.json:

```json
    "@nrwl/next": "^13.8.3",
    "@nrwl/workspace": "12.3.3",
```

It's worth downgrading next to 12.3.3.  Later we will want to move everything to 13.8.3 or later.  If we wait long enough we can just jump to 14.  But a lower more stable version is better than a new less tested one.

I also noticed a mis-match with nest, which was added a little bit later than the rest of the project:

```json
    "@nrwl/nest": "12.5.8",
    "@nrwl/node": "12.5.8",
```

We haven't had any issues with those yet, so no need to switch at this point.

## nx migrate latest

Since we can't create a NextJS app, decided to try to update the project with nx.

Moving from 12.0.0 to "@angular/core": "13.2.7" didn't work out.

```sh
> nx migrate latest
...
Fetching eslint@8.7.0
> NX  The migrate command has run successfully.
- package.json has been updated
- migrations.json has been generated
> NX  Next steps:
- Make sure package.json changes make sense and then run 'npm install'
- Run 'nx migrate --run-migrations'
- To learn more go to <https://nx.dev/using-nx/updating-nx>
- You may run "nx connect-to-nx-cloud" to get faster builds, GitHub integration, and more. Check out <https://nx.app>
```

```sh
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for @swc/core-linux-arm64-musl@1.2.163: wanted {"os":"linux","arch":"arm64"} (current: {"os":"win32","arch":"x64"})
...
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for @swc/core-android-arm64@1.2.163: wanted {"os":"android","arch":"arm64"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: @swc/core-android-arm-eabi@1.2.163 (node_modules\@swc\core-android-arm-eabi):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for @swc/core-android-arm-eabi@1.2.163: wanted {"os":"android","arch":"arm"} (current: {"os":"win32","arch":"x64"})
added 722 packages from 151 contributors, removed 813 packages, updated 346 packages, moved 85 packages and audited 4124 packages in 138.071s
235 packages are looking for funding
  run `npm fund` for details
found 69 vulnerabilities (40 moderate, 13 high, 16 critical)
  run `npm audit fix` to fix them, or `npm audit` for details
```

```sh
> nx serve
Please update your global install of Nx
npm install -g nx
...
npm ERR! code EEXIST
npm ERR! path C:\Program Files\nodejs\node_modules\nx\bin\nx.js
npm ERR! dest C:\Program Files\nodejs\nx.ps1
npm ERR! EEXIST: file already exists, cmd shim 'C:\Program Files\nodejs\node_modules\nx\bin\nx.js' -> 'C:\Program Files\nodejs\nx.ps1'
npm ERR! File exists: C:\Program Files\nodejs\nx.ps1
npm ERR! Remove the existing file and try again, or run npm
npm ERR! with --force to overwrite files recklessly.
```

```sh
nx format
...
Find more information and examples at <https://nx.dev/cli/format-write>

{
  stack: "TypeError: Cannot read property 'endsWith' of undefined\n" +
    '    at createProjectRootMappings (C:\\Users\\timof\\repos\\satisfactory\\node_modules\\@nrwl\\workspace\\src\\core\\file-map-utils.js:12:38)\n' +
    '    at createProjectFileMap (C:\\Users\\timof\\repos\\satisfactory\\node_modules\\@nrwl\\workspace\\src\\core\\file-map-utils.js:27:33)\n' +
    '    at C:\\Users\\timof\\repos\\satisfactory\\node_modules\\@nrwl\\workspace\\src\\core\\project-graph\\daemon\\server\\project-graph-incremental-recomputation.js:92:85\n' +
    '    at Generator.next (<anonymous>)\n' +
    '    at fulfilled (C:\\Users\\timof\\repos\\satisfactory\\node_modules\\@nrwl\\workspace\\node_modules\\tslib\\tslib.js:114:62)\n' +
    '    at processTicksAndRejections (internal/process/task_queues.js:95:5)',
  message: "Cannot read property 'endsWith' of undefined\n" +
    '\n' +
    'Because of the error the Nx daemon process has exited. The next Nx command is going to restart the daemon process.\n' +
    'If the error persists, please run "nx reset".'
}
```

```sh
> nx reset
>  NX   Successfully reset the Nx workspace.
```

> npm install -g nx --force

nx reset recommends nx format.
nx format recommends nx reset.

Nothing works.  I think the next step would be to create a new repo and move apps and libs there manually.
