# Cypress Tests

## Fixing the end-to-end tests after step 8

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

## End-to-end routing tests after step 9

When we ran the end-to-end tests last time, it was a single run with the following command:

```txt
nx e2e customer-portal-e2e
```

According to [the official docs](https://nx.dev/latest/angular/cypress/overview), *by default, Cypress will run in “headed” mode (you will see the tests executing in a new browser window). You will have the result of all the tests and errors (if any) in your terminal.*

*Passing --headless. You will see all the test results live in the terminal. Videos and screenshots will be available for debugging.  In headless mode your tests will be re-run every time you make a change to your application code. Screenshots and videos will be accessible in dist/apps/frontend/screenshots and dist/apps/frontend/videos.*

As yet, there will be no screenshots, but there should be a video of the passed tests.

```txt
nx e2e customer-portal-e2e --headless --watch
```

## Test login

We want to create two more tests for a successful login and an unsuccessful login.

Continuing to use the Page Object pattern that's already started in the Cypress implementation, we can add some other page objects to the app.po.ts file.

apps\customer-portal-e2e\src\support\app.po.ts

```js
export const getGreeting = () => cy.get('.title');
export const getLoginNameField = () => cy.get('.login-name');
export const getLoginNamePassword = () => cy.get('.login-password');
export const getLoginButton = () => cy.get('.login-button');
export const getRightNav = () => cy.get('.right-nav');
```

For this to work, you will have to add classes to each of those components, like this:

```html
<input class="login-name"
  matInput
  placeholder="username"
  type="text"
  formControlName="username"
/>
```

Although there are no styles for that class yet, it will work to give us an easy hook on that input.  Do the same for the other elements shown above.

You could also use an id, or any other valid css selector as seen in the [official docs for the get() function](https://docs.cypress.io/api/commands/get#Arguments).

Then, create a new test file:

apps\customer-portal-e2e\src\integration\login.spec.ts

```js
import {
  getLoginNameField,
  getLoginNamePassword,
  getLoginButton,
  getRightNav,
} from '../support/app.po';

describe('Login Tests', function () {
  it('Successful login', function () {
    cy.visit('/auth/login');
    getLoginNameField().type('duncan');
    getLoginNamePassword().type('123');
    getLoginButton().click();
    getRightNav().contains('Products');
  });
});
```

Note that only the application tests are watched for changes.  You will have to do something like open the login-form.component.html and just save it again to re-run the e2e tests.
