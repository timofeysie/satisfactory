# Work Log

## Form Post Issues

It looks like we will need a new feature to handle this error:

```txt
fullUrl https://commons.wikimedia.org/w/index.php?search=Alzheimer disease&title=Special:MediaSearch&go=Go
list 40
[Nest] 8488   - 08/12/2021, 9:34:00 pm   [ExceptionsHandler] request entity too large +5196212ms
PayloadTooLargeError: request entity too large
    at readStream (C:\Users\timof\repos\timofeysie\satisfactory\node_modules\raw-body\index.js:155:17)
```

Add to the todo list:

fontend: add links from trend briefs to be parsed on the backend
backend: download content from trend links for parsing and add to LSTM training data set

### Meta description string length

Using ng model on the text areas to create a runny tally of the characters for each text read.

Using other change methods relying on the value weren't working.  However, now there is a warning:

```txt
 It looks like you're using ngModel on the same form field as formControlName.
Support for using the ngModel input property and ngModelChange event with
reactive form directives has been deprecated in Angular v6 and will be removed
in a future version of Angular.
For more information on this, see our API docs here:
https://angular.io/api/forms/FormControlName#use-with-ngmode
```

Great.
