# volatile was removed and now has no effect

This issue happened after moving the cartoonify app into this monorepo project.

This project requires NodeJS with npm.  After cloning the app, you will need to run 'npm install' in the root of the project directory to install all the dependencies.

## Steps to reproduce

After installing dependencies, run the node server:

```txt
nx serve nest-demo
```

Go to this url when it's running: http://localhost:3333/api/gan

See the error in the console:

```txt
[Nest] 8948   - 09/01/2022, 2:39:30 pm   [ExceptionsHandler] C:\Users\timof\repos\timofeysie\satisfactory\apps\toonify\src\test.py:63: UserWarning: volatile was removed and now has no effect. Use `with torch.no_grad():` instead.
  input_image = Variable(input_image, volatile=True).float()
```

As a test I removed the volatile argument, but then there was another error a few lines down in the app.

## The code

The Node API service that makes the call to the Python app can be seen here: apps\nest-demo\src\app\gan\gan.service.ts

The process = spawn('python', ...) approach to call Python scripts from NodeJS has been used somewhat successfully in the hugging-face text extraction and summarizer app.

See the apps\nest-demo\src\app\bart\bart.service.ts which handles calling the apps/hugging-face/src/goose.py script as a working example.

Due to the time taken, the result must be loaded by the front end when it's ready.

Note also that calling test.py directly from the command line works to generate an image.

I currently haver Python 3.9.6 64-bit via VS Code.  There are no current plans to deploy this app to a server, having the apps running locally in VS Code is fine for now.

The hugging-face and other Python apps with rely on libraries like pymatting will also need to work and share the same version of Python that all the other apps use as this is a nx monorepo.
