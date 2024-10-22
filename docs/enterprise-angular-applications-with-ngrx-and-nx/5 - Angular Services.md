# 5 - Angular Services

```txt
>nx generate @nrwl/angular:service services/auth/auth
CREATE apps/customer-portal/src/app/services/auth/auth.service.spec.ts
CREATE apps/customer-portal/src/app/services/auth/auth.service.ts
```

Add HttpClientModule to Auth Module and Add login call to a local server

```txt
libs/auth/src/lib/auth.module.ts
libs/auth/src/lib/services/auth/auth.service.ts
```

Part 3. Update Login component to call the service

What's the route?

```txt
course:  libs/auth/src/containers/login/login.component.ts
project: libs\auth\src\lib\containers\login\login.component.ts
clades:  libs\auth\src\lib\containers\login\login.component.ts
```

So the course route has to change?

```bash
nx generate @nrwl/angular:service services/auth/auth --project=auth --skip-import
CREATE libs/auth/src/lib/services/auth/auth.service.spec.ts (347 bytes)
CREATE libs/auth/src/lib/services/auth/auth.service.ts (133 bytes)
```

So the service should be in the lib, not the apps.

apps\customer-portal\src\app\services\auth\auth.service.ts

>nx generate @nrwl/angular:service services/auth/auth <-- duplication!

The file is shown here:

libs/auth/src/lib/services/auth/auth.service.ts

This command will work to put the files in the right place:

nx generate @nrwl/angular:service --project=services/auth

Note I had to enter the name on the command line and add the 'services' folder in front of auth.

```js
import { AuthService } from '../../services/auth.service';
import { Authenticate } from '@demo-app/data-models';
```

Also had to changed the selector again for app to demo-app:

```js
  selector: 'demo-app-login',
```

## Fixing the unit tests

The login.component will now be breaking the spec unit test.

```txt
login.component.spec.ts (6.73 s)
  ● LoginComponent › should create
    NullInjectorError: R3InjectorError(DynamicTestModule)[AuthService -> HttpClient -> HttpClient]:
      NullInjectorError: No provider for HttpClient!
```

Add an import array to the test config with HttpClientTestingModule to fix this.

```js
import { HttpClientTestingModule } from '@angular/common/http/testing';
...
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      ...
```

Do the same for the auth.service.spec.ts file.

The next error will be:

```txt

    console.error
      NG0304: 'demo-app-login-form' is not a known element:
      1. If 'demo-app-login-form' is an Angular component, then verify that it is part of this module.
      2. If 'demo-app-login-form' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to 
suppress this message.
```

We will need to add the LoginFormComponent to this test since it is now included in the auth.module.

```js
import { LoginFormComponent } from './components/login-form/login-form.component';
```

If you put the form component in the imports array like the HTTP testing module, then you will see this error.

```txt
 FAIL   auth  libs/auth/src/lib/containers/login/login.component.spec.ts
  ● LoginComponent › should create
    Unexpected directive 'LoginFormComponent' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation.
```

The form component should actually go in the declarations array along with the component under test like this:

```js
declarations: [LoginComponent, LoginFormComponent],
```

Then all the tests should be passing.
