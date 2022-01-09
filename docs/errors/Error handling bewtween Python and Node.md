# Error handling bewtween Python and Node

What we want to know is if the error from parsing is NOT this:

getArticleSummary service err No model was supplied, defaulted to sshleifer/distilbart-cnn-12-6 (https://huggingface.co/sshleifer/distilbart-cnn-12-6)

There is another message that specifically means the summary will not be created:

service err Traceback (most recent call last):
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\goose3\__init__.py", line 128, in crawler_wrapper

This is a problem with goose, so maybe needs a separate method.

I added some error handling like this in the bart controller like this:

```js
  async getArticleSummary(@Body() article: any) {
    console.log('getArticleSummary');
    return new Promise((resolve, reject) => {
      this.bartService.getArticleSummary(article.link).then((result: any) => {
        console.log('getArticleSummary resolved');
        return resolve(encodeURI(result));
      }).catch((err) => {
        console.log('getArticleSummary rejected');
        reject(err)
;      })
    }).catch((err) => {
      const buf = Buffer.from(err);
      console.log('controller err', buf.toString());
    });
  }
}
```

Doing this is trends.component however breaks stuff:

```js
    this.trendsService
      .kickoffArticleSummary(this.topicForm.controls.linkForSummary.value)
      .pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            console.log(`1-Error: ${error.error.message}`);
          } else {
            console.log(`2-Error: ${error.message}`);
          }
          return of('done');
        })
      );
```

We just needed to add back the subscribe there to kick things off.

Now, we see an error message in the service:

```txt
ngModelWarning @ forms.js:1468
...
Show 21 more frames
trends.service.ts:42 2 - Error:  HttpErrorResponse {headers: HttpHeaders, status: 201, statusText: 'Created', url: 'http://localhost:3333/api/bart', ok: false, …}q
```

That's a start.  The trends.component however has an error:

```txt
ERROR TypeError: Cannot read properties of undefined (reading 'error')
    at CatchSubscriber.selector (trends.component.ts:199:21)
```

The error we get from the trends.component if we handle the object properly is:

```txt
SyntaxError: Unexpected token u in JSON at position 0
```

Not the message we are looking for.  The message we want is coming out in the Nest terminal from here:

bart.service getArticleSummary service err', buf.toString());

If we throw a new error there, then we get this:

```txt
(node:3368) UnhandledPromiseRejectionWarning: Error: No model was supplied, defaulted to sshleifer/distilbart-cnn-12-6 (https://huggingface.co/sshleifer/distilbart-cnn-12-6)
    at C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\nest-demo\webpack:\apps\nest-demo\src\app\bart\bart.service.ts:59:13
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:3368) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:3368) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

Both the controller and the service have catch blocks.

This seems to fix the above error:

return throwError(buf.toString());

But the only error we see in the service or component in the front end is the 'SyntaxError: Unexpected token % in JSON at position 0' message.
