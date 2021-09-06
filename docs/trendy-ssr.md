# Trendy SSR

In the trendy-seo.md doc, the initial SSR attempt failed.  Some notes from that ended up like this:

*In [this issue](https://github.com/nrwl/nx/issues/5915) it shows this command:*

```txt
> nx add @nguniversal/express-engine
Could not find project "@nguniversal/express-engine"
> nx add @nguniversal/express-engine  --project=trendy       
 ERROR  Cannot find target 'add' for project 'trendy'
```

The clientProject flag was not working.

```txt
PS C:\Users\timof\repos\timofeysie\angular\toh-pt6> ng generate universal --client-project=angular.io-example 
Unknown option: '--client-project' 
PS C:\Users\timof\repos\timofeysie\angular\toh-pt6> ng generate universal --clientProject=angular.io-example  
Unknown option: '--clientProject' 
```

Looking at a few TOH examples, this did work:

```txt
PS C:\Users\timof\repos\timofeysie\angular\toh-pt6> ng add @nguniversal/express-engine 
Skipping installation: Package already installed 
CREATE src/main.server.ts (698 bytes) 
CREATE src/app/app.server.module.ts (318 bytes) 
CREATE tsconfig.server.json (396 bytes) 
CREATE server.ts (2044 bytes) 
UPDATE package.json (1863 bytes) 
UPDATE angular.json (5903 bytes) 
UPDATE src/main.ts (432 bytes) 
UPDATE src/app/app.module.ts (1468 bytes) 
UPDATE src/app/app-routing.module.ts (720 bytes) 
✔ Packages installed successfully. 
```

ng add @nguniversal/express-engine 

```txt
To transform a Angular CLI workspace to an Nx workspace, use the ng add command:
ng add @nrwl/workspace
```

ng add @nrwl/workspace @nguniversal/express-engine  --project=trendy
