# Next.js with nx

<https://nx.dev/next/overview>

## npm and nx

```txt
npm install --save-dev @nrwl/next
nx g @nrwl/next:app next-app
nx g @nrwl/next:lib next-layout-lib
nx g @nrwl/next:page demo-page --project=next-app
nx g @nrwl/next:component demo-component --project=next-app
nx serve my-new-app --prod
nx test my-new-app
nx test my-new-lib
nx e2e my-new-app-e2e
nx build my-new-app
nx export my-new-app
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

## Layout

The [docs](https://nextjs.org/docs/basic-features/layouts) show a basic method for creating a layout that can contain the content.

It shows these components

components/layout.js
components/navbar.js
components/footer.js

We will try out the "one layout for the entire application" approach by creating a Custom App to wrap the application with the layout.

Since the <Layout /> component is re-used when changing pages, its component state will be preserved (e.g. input values).

I thought this would be done in a lib, but it shows using components.  Lets see what the different generated things look like out of the box.

```txt
nx g @nrwl/next:lib next-lib
√ Which stylesheet format would you like to use? · css
UPDATE workspace.json
UPDATE nx.json
CREATE libs/next-lib/.eslintrc.json   
CREATE libs/next-lib/.babelrc
CREATE libs/next-lib/README.md        
CREATE libs/next-lib/src/index.ts     
CREATE libs/next-lib/tsconfig.json    
CREATE libs/next-lib/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/next-lib/jest.config.js
CREATE libs/next-lib/tsconfig.spec.json
UPDATE jest.config.js
CREATE libs/next-lib/src/lib/next-lib.module.css
CREATE libs/next-lib/src/lib/next-lib.spec.tsx
CREATE libs/next-lib/src/lib/next-lib.tsx
```

nx g @nrwl/next:page demo-page --project=next-app

nx g @nrwl/next:component demo-component --project=next-app

### Custom Apps

In the layout section it is recommended to create a [Custom App](https://nextjs.org/docs/advanced-features/custom-app) to initialize pages in order to persist the layout between page changes, keep the state when navigating pages and provide custom error handling

With the Nx Next app generation shown above, this is done for us automatically.  It says to override the default App by creating the file ./pages/_app.js.

We already have this file, and it's already using TypeScript:

apps\next-app\pages\_app.tsx

## Static-site generation with getStaticProps

In the official NextJs docs on Data Fetching there is a page on SSG: Static-site generation which says *pre-rendering can result in better performance and SEO.*

We will be using this [Static Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) method.  This means the HTML is generated at build time and will be reused on each request.

The getStaticProps state that the page must be pre-rendered for SEO and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance
