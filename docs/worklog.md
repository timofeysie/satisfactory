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

## Detect aspect of images

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

## News links array

Currently the links are all kind of hard wired.

```json
  "links": {
    "newsLink": "",
    "useAPNewsLink": true,
    "addAPNewsContent": "",
    "wikiLink": "",
    "useWikiLink": "true",
    "addWikiLinkContent": ""
  },
```

What we want is an array of link objects such as:

links: [
  {
    linkUrl: xxx,
    linkLable: AP News,
  }, {
    linkUrl: https://en.wikipedia.org/wiki/Pat_Summerall,
    linkLable: Pat Summerall on Wikipedia,
  }, {
    linkUrl: https://en.wikipedia.org/wiki/John_Madden,
    linkLable: John Madden on Wikipedia,
  },
]

Would we really need a useLink?  If they are there, we will use them, if not, we wont.  I don't see any point to keeping hidden data around.  I can take notes on that if I want to.

We just need a way to allow the user to enter multiple subjects that can automatically created the above links, or let the user create specific data.

## Get a particular topic json file

```js
  getCategory(category: string) {
    return new Promise((resolve, reject) => {
      fs.readFile('./posts/' + category, 'utf-8', (err, file) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(file));
      });
    });
  }
```

http://localhost:3333/api/products/Belfast.json

## Product API work

So far, the get and get detail functions are done.  We have the create function in the trendy library, but the products library now used as the trends list, needs to share the form used to create the "product" in order to edit the data at a later date.

We also want to save the query that was used to create the data on the first page of the trend product creation page.

There is a lot of shared logic there that is not SOLID.  We want to use the edit features from this.  It may be necessary to extract the component to a separate library which can be used in both spots so that improvements and changes to it only have to happen in one place.

For edit mode, we need an edit icon.  This is a bit of a rabbit hole as we have avoided using icons in this project so far.  It's not part of the Duncan.

But, the steps were figured out for the Tundra app, so now it's time to try that out here.  The pencil I con we want is:

```html
<i class="fa-solid fa-pencil"></i>
```

Or is that this?

```html
<fa-icon [icon]="faEdit"></fa-icon>
```

What does Tundra do?

```html
><fa-icon [icon]="faThumbsUp"></fa-icon>
```

So what else needs to happen?  Neither version is showing up:

Add FontAwesomeModule to imports in src/app/app.module.ts

OK, did that.  But still not showing.  I guess it's in a different lib?

A SO answer points out:

The icon in font awesome is separated into different packages which allow us to install only the needed icon for our project. This helps to reduce the size of the font-awesome package size.

```txt
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-brands-svg-icons
$ npm i --save fortawesome/free-regular-svg-icons
$ npm i --save @fortawesome/free-solid-svg-icons
```

So giving this a try, since it's a solid edit icon we're trying to use.

npm i --save @fortawesome/free-solid-svg-icons

The issue turned out to be that the module shouldn't be the app, but where the icons are used, which is the product module, not the app.module.

## A shared form

It sounded like a good idea when I wrote the above about moving the form to its own lib.

The problem is the current form contains a lot of logic when it's created to pre-fill the fields based on the topic and other things entered in the first step.  Some of those are editable on the next screen, some are not.  And it would be expected that some of the fields are read-only.

One idea is to let the user edit the raw json, and come what may.  That might be the simplest way forward for now.

nx g @nrwl/angular:component  containers/detail-form --project=products

The textarea needs to have formatted JSON, otherwise it would be a nightmare to edit.

[This article](https://www.tutorialspoint.com/prettify-json-data-in-textarea-input-in-javascript) provided a working solution for that.

However, when the data is saved, that formatting needs to be undone.  JSON.stringify adds extra dashes.  JSON.parse creates this error:

```txt
core.js:6456 ERROR SyntaxError: Unexpected token o in JSON at position 1
    at JSON.parse (<anonymous>)
```

[This SO answer](https://stackoverflow.com/questions/38380462/syntaxerror-unexpected-token-o-in-json-at-position-1?rq=1) indicates a solution like this:

JSON.parse(JSON.stringify(reqData));

However, this will result in data like this, and break the display, as it's not a JS object now.

{"data": "{\n    \"pageTitle\": \"Belfast!!!\",\n    \"authors\": \"<AI>, <ARTIST>\" ...

```js
  onSave() {
    this.save.emit(JSON.stringify(this.productForm.value));
  }
```

```txt
"{\"data\":\"{\\n    \\\"pageTitle\\\": \\\"Belfast\\\", ...
```

Add this in the product-list.component:

```js
  onSaveDetails(data: any) {
    this.selectedProduct = JSON.parse(data);
```

```txt
{
  "data": "{\n    \"pageTitle\": \"Belfast\",\n ...
```

I'm not sure which output is closer to what we want.  And the last one will happen if there is no parse or stringify used.

When we put the data into the textarea, we tried something like this:

```js
    const parseJSON = JSON.parse(JSON.stringify(data));
    this.selectedProduct = JSON.stringify(parseJSON, undefined, 4);
```

But then we end up with this even worse looking result:

```txt
"{\n    \"data\": \"{\\n    \\\"pageTitle\\\": \\\"Belfast\\\" ...
```

This would be the same if we just stringify the data.

Just striping out new lines wont work, as some of the values have intentional newlines.

We could save the data to the server, then load it again, because it's all about that file really.  Or just forget this feature for now.

The main thing right now is to use this feature to show issues with the created json and then fix those.

Anyhow, finish off the update on the server app for now.

TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Object--

Doing this results in an empty file with {}.

fs.writeFile('./posts/' + id, JSON.stringify(updateProduct), () => {

This is actually getting sent to the service.  Have to look at that after going to the beach.

It's not making it via the http call in the controller or service.

products.service.ts:21 sending body { "pageTitle": "Belfast1", ...

But the server gets this:

controller patch Belfast copy.json updateProduct {}

So then the service writes a blank file.

[SO says](https://stackoverflow.com/questions/46669615/angular-http-post-request-content-type-from-text-plain-to-application-json): *Your postman request needs to be set to raw and JSON, not raw and Text*

Here is the code to accomplish that and fix this issue:

```ts
  updateProducts(category, body): Observable<Product[]> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    const url = `http://localhost:3333/api/products/${category}`;
    return this.httpClient.post<any>(url, body, { headers: headers });
  }
```

## 2022 January 1st

### todo

- transition to list again after form submitted
- links array

#### add trends to json submitted

The trend data is held here: this.trendDetails

Add that to the submitted form, and we get this error:

TypeError: Cannot read property 'split' of undefined
    at TrendsService.create (C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\nest-demo\webpack:\apps\nest-demo\src\app\trends\trends.service.ts:11:47)

## Calling Python from Node

### id Sidney Poitier

fullUrl https://commons.wikimedia.org/w/index.php?search=Sidney Poitier&title=Special:MediaSearch&go=Go
list 40
service err Traceback (most recent call last):
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\goose3\__init__.py", line 128, in crawler_wrapper

(node:15884) UnhandledPromiseRejectionWarning: TypeError: Cannot read property '0' of undefined
    at C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\nest-demo\webpack:\apps\nest-demo\src\app\bart\bart.controller.ts:32:53

The file written has a from like this:

[{'summary_text': '...'}]

So accessing the text directly and sending that back like this causes the above error:

resolve(result[0].summary_text);

However, after reverting that change and deleting that file and trying again, the summary file is not being written.  This is all that the server is outputting:

service err No model was supplied, defaulted to sshleifer/distilbart-cnn-12-6 (https://huggingface.co/sshleifer/distilbart-cnn-12-6)

I'm tempted to start a new branch with the changes and start back from the working position.  Or just look at what has changed since the last commit in the goose.py file.  As of now, it appears completely broken like my fathers says of the Republican party.

Here is the file after just moving the print and flush commands to the end of the file which doesn't seem to help anyway.

```py
from goose3 import Goose
from transformers import pipeline
import sys

# extract article text
g = Goose()
article = g.extract(url=sys.argv[1])
g.close()

# Initialize the HuggingFace summarization pipeline
summarizer = pipeline("summarization")
summarized = summarizer(article.cleaned_text, min_length=75, max_length=300)

# Print summarized text and save file
file = open('apps/hugging-face/src/articleSummary.txt', 'x')
file.write(summarized)
file.close()

print(summarized)
sys.stdout.flush()
```

Other than that, the findAll() and the loadSummary() functions were added to get the file written in the getArticleSummary() service.

Commit message: added a use generated summary button and service to retrieve file written by nest but goose appears to be always failing
