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

## detect aspect of images

The Wikimedia images have this style:

```css
height: 100% !important;
max-width: 4320px !important;
max-height: 3240px
```

The only way to automatically set this would be to see which one is bigger.

If type = AI and max-width > max-height, then aspect = landscape, else portrait.

Type = Artist can default to portrait until they decide otherwise.  It fits on the screen better.0

Given that we want to extract the foreground and combine images, this wont be the last time this logic will have to be addressed, so a quick and dirty approach like this will do for now.

Next, we need to surface that in the form to let the user change it.

We need a select and hopefully a data model.

```html
<mat-form-field class="selector picture-post-card-top">
    <mat-select
    appearance="none"
    #typeSelector
    click="typeSelector.close()"
    placeholder="Type"
    (selectionChange)="onTypeSelectionChange($event.value, 'one')"
    >
    <mat-option [value]="'AI'">A.I.</mat-option>
    <mat-option [value]="'ARTIST'">Artist</mat-option>
    </mat-select>
</mat-form-field>
```

HTML is a programming language.  It uses JS, it's not JS using HTML.

HTML is a kind of structural language.  It loads in a browser and starts to execute scripts.

Maybe it's a bias propagated by computer scientists to weed out what they see as maybe just designers that code or something.  Not sure.  There certainly are a lot of memes on the topic.

Now, the default value for this is a little tricky.   Just forget about that for now.

Posting the form now has an error:

```txt
error: SyntaxError: Unexpected token T in JSON at position 0 at JSON.parse (<anonymous>) at XMLHttpRequest.onLoad (http://localhost:4200/vendor.js:26186:51) at 
...
[[Prototype]]: Error
text: "This action adds a new trend"
```

Despite what that error says, the file is written:

```json
ok: false
status: 201
statusText: "Created"
```
