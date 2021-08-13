# Image search

Could use Azure, or do it manually.

## SerpApi search

npm i google-search-results-nodejs

nx generate @nestjs/schematics:resource images --sourceRoot apps/nest-demo/src/app

It seems simple enough to make the call and get the images:

```js
import * as SerpApi from 'google-search-results-nodejs';
...
  findOne(id: string) {
    const search = new SerpApi.GoogleSearch(
      '<api key>'
    );
    const params = {
      q: id,
      tbm: 'isch',
      ijn: '0',
    };
    const callback = function (data) {
      return data['images_results'];
    };
    return search.json(params, callback);
  }
```

The images can be output to the console inside the callback, but they never get returned from the function.  If it's due to an async issue or something else, I'm not sure.

The data['images_results'] looks like this for http://localhost:3333/api/images/bear:

```js
[
  {
    position: 1,
    thumbnail: 'https://serpapi.com/searches/6112a21f033e941e7ddf4e61/images/130ccb38b0750b47e590445adc077483523c8ccb6450250d4919eb7484dd3fcb.jpeg',
    source: 'en.wikipedia.org',
    title: 'Brown bear - Wikipedia',
    link: 'https://en.wikipedia.org/wiki/Brown_bear',
    original: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1200px-2010-kodiak-bear-1.jpg',   
    is_product: false
  },
```

Just returning that temp data shows that the api will work to return an array, but in the callback context, it wont work.

I've tried here and there for hours now, so it's time to move on and give Bing a try.  I hate giving up, but there seems to be some giant hurdle here that I would rather not hack my way around.

But, being stubborn, and as I mentioned before, really hating to give up, I decided to read [the docs a bit](https://docs.nestjs.com/controllers#asynchronicity).  It also helped to find out that each request is cached, so these tests are not adding up to the 100 search quota of a free account.

You can return a deferred value that Nest will be able to resolve by itself.

Controllers are able to return RxJS observable streams. Nest will automatically subscribe to the source underneath and take the last emitted value (once the stream is completed).

So this should be doable.

Adding some more comments, I can see that the 

```txt
controller result Promise { <pending> }
service search result undefined
callback data 100
```

These are all in the opposite order, so we should be able to use async/await, or rxjs to solve this.  Hours go by.  I try everything like a monkey.  Time for Bing.

Or, since we do get results inside the callback, write those out to a db.  After all, we actually want thousands of images, which means dozens of calls (100 urls per).

This is doable.  The results come back out of order, but they can be aggregated.

```txt
6 data[images_results] 50
3 data[images_results] 100
0 data[images_results] 100
2 data[images_results] 100
5 data[images_results] 100
4 data[images_results] 100
1 data[images_results] 100
```

650 should be enough to get started with.

Christina%20Applegate, the current 200+ trend has this 543 images.

However, we have a problem now:

Searches done this month: 30
Searches per month: 100

Bing is looking better again.

Getting a good response from the hard-wired search term.  Getting one from the uri fails:

body {"_type": "ErrorResponse", "errors": [{"code": "InvalidRequest", "subCode": "ParameterInvalidValue", "message": "Parameter has invalid value.", "moreDetails": "Invalid custom config Id.", "parameter": "customconfig"}]}

Strange that the same config id works for the first findAll function.

Absolutely no search results for this id.  Do they scrub the results so that people have to buy support plans?

I have a Subscription ID

Which I assume is the subscription key.

Maybe it's the resource id?

In keys and endpoints, there are two keys.
In the url, we see these:

url: 'https://api.bing.microsoft.com/v7.0/custom/search?' + 'q=' +
        searchTerm +
        '&' +
'customconfig=' + customConfigId,
headers: {
'Ocp-Apim-Subscription-Key': subscriptionKey,

In the quick start, it says:

*Click on the Production tab under Endpoints, and copy your Custom Configuration ID. You need this ID to call the Custom Search API by appending it to the customconfig= query parameter in your calls.*

There is no production tab under endpoints.  Only those two keys.

Looks like there is a whole new service: https://www.customsearch.ai/applications

I don't want to search a url.  I want to do an image search.

Christina Applegate is the test trend.

The difference?

Search

curl --header "Ocp-Apim-Subscription-Key: <subscription_key>" "https://api.bing.microsoft.com/v7.0/custom/search?q=&customconfig=...&mkt=en-US"

Images

curl --header "Ocp-Apim-Subscription-Key: <subscription_key>" "https://api.bing.microsoft.com/v7.0/custom/images/search?q=&customconfig=...&mkt=en-US"

Images returns nothing.  What's up with that?  Can still generate some NL.

Here are more params

curl --header "Ocp-Apim-Subscription-Key: sub-key" "https://api.bing.microsoft.com/v7.0/custom/images/search?q=pinkie&customconfig=key=en-US&setLang=EN&safesearch=Moderate&count=50&offset=1"

The text search version looks like this:

```js
  findOne(id: string) {
    const subscriptionKey = process.env['subscriptionKey'];
    const customConfigId = process.env['customConfigId'];
    const searchTerm = encodeURI(id);
    const info = {
      url:'https://api.bing.microsoft.com/v7.0/custom/search?' +
        'q=' + searchTerm +
        '&' + 'customconfig=' + customConfigId,
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    };
    console.log('info', info);
    return new Promise((resolve) => {
      request(info, function (error, response, body) {
        const searchResponse = JSON.parse(body);
        if (searchResponse.webPages) {
          for (let i = 0; i < searchResponse.webPages.value.length; ++i) {
            const webPage = searchResponse.webPages.value[i];
            console.log('name: ' + webPage.name);
            console.log('url: ' + webPage.url);
            console.log('displayUrl: ' + webPage.displayUrl);
            console.log('snippet: ' + webPage.snippet);
            console.log('dateLastCrawled: ' + webPage.dateLastCrawled);
          }
          resolve(searchResponse);
        } else {
          return resolve(error);
        }
      });
    });
```

I had difficulty again with the RxJs version, so falling back to the old ways with a promise.

The image search is yet to work.  But we do need a text search.  I propose a new api called text or search or something, as it doesn't look good to have an api called images that returns text.

## Image search

Could use Azure, or do it manually.

## SerpApi search

npm i google-search-results-nodejs

nx generate @nestjs/schematics:resource images --sourceRoot apps/nest-demo/src/app

It seems simple enough to make the call and get the images:

```js
import * as SerpApi from 'google-search-results-nodejs';
...
  findOne(id: string) {
    const search = new SerpApi.GoogleSearch(
      '<api key>'
    );
    const params = {
      q: id,
      tbm: 'isch',
      ijn: '0',
    };
    const callback = function (data) {
      return data['images_results'];
    };
    return search.json(params, callback);
  }
```

The images can be output to the console inside the callback, but they never get returned from the function.  If it's due to an async issue or something else, I'm not sure.

The data['images_results'] looks like this for http://localhost:3333/api/images/bear:

```js
[
  {
    position: 1,
    thumbnail: 'https://serpapi.com/searches/6112a21f033e941e7ddf4e61/images/130ccb38b0750b47e590445adc077483523c8ccb6450250d4919eb7484dd3fcb.jpeg',
    source: 'en.wikipedia.org',
    title: 'Brown bear - Wikipedia',
    link: 'https://en.wikipedia.org/wiki/Brown_bear',
    original: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1200px-2010-kodiak-bear-1.jpg',   
    is_product: false
  },
```

Just returning that temp data shows that the api will work to return an array, but in the callback context, it wont work.

I've tried here and there for hours now, so it's time to move on and give Bing a try.  I hate giving up, but there seems to be some giant hurdle here that I would rather not hack my way around.

But, being stubborn, and as I mentioned before, really hating to give up, I decided to read [the docs a bit](https://docs.nestjs.com/controllers#asynchronicity).  It also helped to find out that each request is cached, so these tests are not adding up to the 100 search quota of a free account.

You can return a deferred value that Nest will be able to resolve by itself.

Controllers are able to return RxJS observable streams. Nest will automatically subscribe to the source underneath and take the last emitted value (once the stream is completed).

So this should be doable.

Adding some more comments, I can see that the 

```txt
controller result Promise { <pending> }
service search result undefined
callback data 100
```

These are all in the opposite order, so we should be able to use async/await, or rxjs to solve this.  Hours go by.  I try everything like a monkey.  Time for Bing.

Or, since we do get results inside the callback, write those out to a db.  After all, we actually want thousands of images, which means dozens of calls (100 urls per).

This is doable.  The results come back out of order, but they can be aggregated.

```txt
6 data[images_results] 50
3 data[images_results] 100
0 data[images_results] 100
2 data[images_results] 100
5 data[images_results] 100
4 data[images_results] 100
1 data[images_results] 100
```

650 should be enough to get started with.

Christina%20Applegate, the current 200+ trend has this 543 images.

However, we have a problem now:

Searches done this month: 30
Searches per month: 100

This is not a scalable solution.  Bing is looking better again.

## Bing Search API

The setup from the official docs was pretty simple

Getting a good response from the hard-wired search term.  Getting one from the uri fails:

body {"_type": "ErrorResponse", "errors": [{"code": "InvalidRequest", "subCode": "ParameterInvalidValue", "message": "Parameter has invalid value.", "moreDetails": "Invalid custom config Id.", "parameter": "customconfig"}]}

Strange that the same config id works for the first findAll function.

Absolutely no search results for this id.  Do they scrub the results so that people have to buy support plans?

I have a Subscription ID

Which I assume is the subscription key.

Maybe it's the resource id?

In keys and endpoints, there are two keys.
In the url, we see these:

url: 'https://api.bing.microsoft.com/v7.0/custom/search?' + 'q=' +
        searchTerm +
        '&' +
'customconfig=' + customConfigId,
headers: {
'Ocp-Apim-Subscription-Key': subscriptionKey,

In the quick start, it says:

*Click on the Production tab under Endpoints, and copy your Custom Configuration ID. You need this ID to call the Custom Search API by appending it to the customconfig= query parameter in your calls.*

There is no production tab under endpoints.  Only those two keys.

Looks like there is a whole new service: https://www.customsearch.ai/applications

I don't want to search a url.  I want to do an image search.

Christina Applegate is the test trend.

The difference?

Search

curl --header "Ocp-Apim-Subscription-Key: <subscription_key>" "https://api.bing.microsoft.com/v7.0/custom/search?q=&customconfig=...&mkt=en-US"

Images

curl --header "Ocp-Apim-Subscription-Key: <subscription_key>" "https://api.bing.microsoft.com/v7.0/custom/images/search?q=&customconfig=...&mkt=en-US"

Images returns nothing.  What's up with that?  Can still generate some NL.

Here are more params

curl --header "Ocp-Apim-Subscription-Key: sub-key" "https://api.bing.microsoft.com/v7.0/custom/images/search?q=pinkie&customconfig=key=en-US&setLang=EN&safesearch=Moderate&count=50&offset=1"

The text search version looks like this:

```js
  findOne(id: string) {
    const subscriptionKey = process.env['subscriptionKey'];
    const customConfigId = process.env['customConfigId'];
    const searchTerm = encodeURI(id);
    const info = {
      url:'https://api.bing.microsoft.com/v7.0/custom/search?' +
        'q=' + searchTerm +
        '&' + 'customconfig=' + customConfigId,
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    };
    console.log('info', info);
    return new Promise((resolve) => {
      request(info, function (error, response, body) {
        const searchResponse = JSON.parse(body);
        if (searchResponse.webPages) {
          for (let i = 0; i < searchResponse.webPages.value.length; ++i) {
            const webPage = searchResponse.webPages.value[i];
            console.log('name: ' + webPage.name);
            console.log('url: ' + webPage.url);
            console.log('displayUrl: ' + webPage.displayUrl);
            console.log('snippet: ' + webPage.snippet);
            console.log('dateLastCrawled: ' + webPage.dateLastCrawled);
          }
          resolve(searchResponse);
        } else {
          return resolve(error);
        }
      });
    });
```

I had difficulty again with the RxJs version, so falling back to the old ways with a promise.

The image search is yet to work.  But we do need a text search.  I propose a new api called text or search or something, as it doesn't look good to have an api called images that returns text.

## Text search

Instead of separating the image search from the text search, it's better to have this search be the entry point to the model training we need to do to create a new image and a title/description for the image.

So for this, we need a new library that can be called by the images.service to kick of this process.  It's not clear how this will all work.  How will the front end know it's finished?  What kind of updates will it want during the training and generation?  But we have to start somewhere.

So lets start with a lib.  One lib for the images, one lib for the test search.  What to call the lib?  What's it going to do again?

Create a data set for LSTM model training to implement an ensemble RNN neural network for natural language generation.

The terms used are:

- RNN - Recurrent neural network
- LSTM - Long Short-Term Memory

We could call it a text-generator at it's most basic.

The Nx docs suggest making a lib with a controller.

nx g @nrwl/nest:lib auth --controller

The only thing that needs to happen is the lib module has to be imported into the NestJS app.module, and the rest is taken care of.  Let's give it a try.

nx g @nrwl/nest:lib text-generator

Only the controller doesn't get generated as is shown in [the NodeJS tutorial](https://nx.dev/previous/node/tutorial/04-create-libs).

What we need is a vanilla lib and a service.

nx generate @nrwl/angular:service --project=services/auth

Note I had to enter the name on the command line and add the 'services' folder in front of auth.

nx generate @nrwl/angular:service services/text-gen/text-gen --project=text

How about this:

nx g @nrwl/nest:lib generator

nx generate @nrwl/angular:service services/text/text --project=generator

I'm still not sure what the difference between a lib and a nest lib is.

I think this might be a problem.  Let's just make a vanilla lib with a vanilla service.  Wait, there is no vanilla service.  You mean an Angular service?  Hahaha.  We did put Angular there!

nx g @nrwl/nest:lib generator

nx generate @nrwl/nest:service services/text/text --project=generator

The difference is the import and injector:

```js
import { Injectable } from '@nestjs/common';
@Injectable()
```

Another difference is that this way adds an extra path:

```js
import { TextService } from '../services/text/text/text.service';
```

Even so, we can't get that service:

```js
Module '"@demo-app/generator"' has no exported member 'TextService'.
```

```txt
C:\Users\timof\repos\hits\dist\apps\nest-demo\webpack:\apps\nest-demo\src\app\images\images.service.ts:45
            this.textService.addText(webPage.name + ' ' + webPage.snippet);
                             ^
TypeError: Cannot read property 'addText' of undefined
```

Even after setting all this up, the service is undefined.

On the surface it seems like, yeah, this is not Angular land, so we can't use a service.  But it is a Nest schematic, so why is it even there if it's not going to work?

*The "emitDecoratorMetadata": true is missing in your tsconfig.json file.*

Sounds suspicious.  I mean, this is a bug, right?  And which tsconfig file?  The one in the module with the service, or the one in the module with the API?  Trying the former first.

There is that line in the compiler options of the workspace and the nest app.  But it is in the tsconfig.app.json file, not the tsconfig.json file.

So if that option is already in the apps\nest-demo\tsconfig.app.json compiler options section, and putting it in this file doesn't work, what's next?

libs\generator\tsconfig.lib.json

For whatever reason, or whatever should happen with the GeneratorModule, it's not working. 

This might be a solution:

```js
export class ImagesService {
  constructor(
    @Inject(forwardRef(() => TextService))
    textService: TextService
  ) {
```

There is also some good discussion on [this StackOverflow](https://stackoverflow.com/questions/51819504/inject-nestjs-service-from-another-module).  But none of that worked for me.

Rolling back this idea.  For now we will just add a service to the app and forego the extra lib.

nx generate @nrwl/nest:service services/generator/generator --project=nest-demo
