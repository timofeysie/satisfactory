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
