# Wiki-commons

When a trend is chosen, we want to show the image search result from a Wikimedia image search.

https://commons.wikimedia.org/wiki/Category:Images

Wikimedia doesn't have images for everything.  For example, Matthew Mindler had 200K+ searches, again getting to the top of the trends after his death in August.  This time the news revealed it was suicide and that he had bought the poison on Amazon.  The sad fate of a child actor.

Contrast this with the top search for "Dodgers" with 2M+ searches: 735 results.

https://commons.wikimedia.org/w/index.php?search=Dodgers&title=Special:MediaSearch&go=Go&type=image

Plenty of good images to choose from, such as the first on the list:

https://commons.wikimedia.org/wiki/File:Jackie_Robinson,_Brooklyn_Dodgers,_1954.jpg

It will also be helpful to look at the Licensing

Public domain: This work has been released into the public domain by its copyright holder...
In some countries this may not be legally possible; if so:
Cowles Communications, Inc. grants anyone the right to use this work for any purpose, without any conditions, unless such conditions are required by law.
Public domain: This is a photo taken by Bob Sandberg when working as a staff photographer of LOOK Magazine, and is part of the LOOK Magazine Photograph Collection at the Library of Congress. Their former owner, Cowles Communications, Inc, dedicated to the public all rights it owned to these images as an instrument of gift.

Note: Cowles has expressed its desire that these images not be used for "trade or advertising purposes". However, this request cannot be meant as a legally binding copyright restriction on their re-use, as all the rights to this image were released; rather, it is a caution against the use of celebrity images to imply product endorsement, drawn from civil rights law, and is unrelated to copyright. See {{Personality rights}}.

In this case, the Dodgers beat the Giants of SF, and most of the searches came from California.

This brings us to the next point: doing a Wikipedia search and somehow getting to the point which describes why the trend is trending.

It's tempting just to provide a link and let the user brows the link and choose an image.  But we also want to collect the license info, author, page url and possibly other things.  So in order to automate that, we will need to get the data for the list so the selected image and it's info can be all collected and this will kick off the rest of the automation.

Information about the license category is here: https://commons.wikimedia.org/wiki/Commons:Commons_API

We can always scrape a webpage, but if there is an api to get json and the links to images, that save us extra work, which we are all about.

Tim, and old pro like you at Wikipedia content should already know the correct way to get a JSON response.

Well, let's check with last years favorite app, Khipu.

The service there is: src\app\features\category-item-details\category-item-details.service.ts

```js
wikidata: (c: WikidataContext) => 
`www.wikidata.org/wiki/Special:EntityData/${c.qcode}.json`,
wikipedia: (c: WikipediaContext) =>
`https://radiant-springs-38893.herokuapp.com/api/detail/${c.title}/${c.language}/false`,
wikimedia: (c: WikipediaContext) =>
`https://radiant-springs-38893.herokuapp.com/api/details/${c.language}/${c.title}`,
wikilist: (c: WikilistContext) =>
`https://radiant-springs-38893.herokuapp.com/api/wiki-list/${c.title}/${c.section}/${c.language}`
```

That NodeJS app is pretty embarrassing these days.  I think it would be better to migrate that into our nest app.

Conchifolia: A NodeJS Angular 6 app to use WikiData content.

```js
  .get("/api/wiki-list/:name/:section/:lang", function (req, res) {
    if (req.method === "OPTIONS") {
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      //headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] =
        "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = true;
      headers["Access-Control-Max-Age"] = "86400"; // 24 hours
      headers["Access-Control-Allow-Headers"] =
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
    } else {
      const wikiMediaUrl = curator.createWikiMediaUrlWithName(
        req.params.name,
        req.params.section,
        req.params.lang
      );
      // TODO: move this into curator
      let newUrl = wikiMediaUrl.replace("http", "https");
      if (req.params.section === "all") {
        newUrl = newUrl.replace("&section=all", "");
      }
      https
        .get(newUrl, (wikiRes) => {
          const statusCode = wikiRes.statusCode;
          let error;
          if (statusCode !== 200) {
            error = new Error(
              "Request Failed.\n" + `Status Code: ${statusCode}`
            );
          }
          if (error) {
            console.error(error.message);
            wikiRes.resume();
            return;
          }
          let rawData = "";
          wikiRes.on("data", (chunk) => {
            rawData += chunk;
          });
          wikiRes.on("end", () => {
            res.status(200).send(rawData);
          });
        })
        .on("error", (e) => {
          console.error(`Got error: ${e.message}`);
          if (typeof e.status !== "undefined") {
            res.status(e.status).send(e.message);
          }
        });
    }
  })
```

Would be a good idea to follow the todo comment and move that business logic into the curator lib.

Going to have to look at the curator as I'm not sure if it's going to create an Wikimedia image search api for us.

The function in question there is:

```js
/** Create a url for a WikiMedia API call.
 * Currently set to return a list of cognitive bias. */
function createWikiMediaUrl(sectionNum, lang) {
  let language = 'en';
  if (lang) {
      language = lang;
  }
  let action = 'action=parse';
  let section = 'section='+sectionNum;
  let prop = 'prop=text&format=json';
  let page = 'page=List_of_cognitive_biases';
  const baseUrl = 'http://'+language+'.wikipedia.org/w/api.php';
  let sectionUrl = baseUrl+'?'+action+'&'+section+'&'+prop+'&'+page;
  return sectionUrl;
}
```

But where is createWikiMediaUrlWithName()?  I don't see that in the Curator.  That's very strange.

The test shows that the link created is actually not Wikimedia, it's Wikipedia.  But, yes, technically Wikipedia is backed by Wikimedia but the api for our images is probably different.

```js
it('should contain a WikiMedia API call string', function() {
  expect(dataUrl).to.equal('http://en.wikipedia.org/w/api.php?action=parse&section=1&prop=text&format=json&page=List_of_cognitive_biases');
});
```

## Image results UX

Currently, we show the results of the Google Trends with an image and a brief description of the trend.  This is helpful to get an idea of why the search is trending.  We will want to capture all of this to send to the backend to add these to the content that is used to create the model for the generated image description.

The user is also going to have to decided on what to put as a description of the page that will show the images for the trend.  Currently, we manually scape a section of the Wikipedia page which relates to the reason the search is trending.  To assist this it would be nice to get the topic description at least with a link to Wikipedia.  The user could choose to click through and capture their own section.  It's beyond the scope of this automation to determine what that should be.

It's possible there will be no Wikipedia page on the trending search, or no information relating to why the search is trending.  In this case, the descriptions for the Google Trends results will be key.  In either case, we want the user to cut, paste, edit and provide their own description of why the search is trending.

There could be other features here, such as sending a challenge to another artist to give them a chance to compete with the AI.  That functionality is a long way off, but just shows that this page is going to go through various iterations.

OK, so we will have three data sources now and an form:

1. The Google Trends brief results list
2. The commons.wikimedia image results list
3. The top of the Wikipedia page
4. The description form: title, description, category, image content?

OK.  That gives us a good idea of what the UX should be.  No idea what it's going to look like yet.  First, I want the API for 2 and 3 done.  Than we can arrange and compose those results.

It's tempting to roll 2 and 3 into one api call, but let's keep them separate for now.  We already have a lot of routes in the nest demo.  So let's not add a new controller.

```txt
    AppController {/api}: +38ms
    Mapped {/api, GET} route +6ms
    LoginController {/api/login}: +1ms
    Mapped {/api/login, POST} route +3ms
    Mapped {/api/login, GET} route +2ms
    Mapped {/api/login/:id, GET} route +21ms
    Mapped {/api/login/:id, PATCH} route +7ms
    Mapped {/api/login/:id, DELETE} route +5ms
    TrendsController {/api/trends}: +3ms
    Mapped {/api/trends, POST} route +32ms
    Mapped {/api/trends, GET} route +3ms
    Mapped {/api/trends/:id, GET} route +9ms
    Mapped {/api/trends/:id, PATCH} route +2ms
    Mapped {/api/trends/:id, DELETE} route +3ms
    ImagesController {/api/images}: +3ms
    Mapped {/api/images, POST} route +3ms
    Mapped {/api/images, GET} route +6ms
    Mapped {/api/images/:id, GET} route +2ms
    Mapped {/api/images/:id, PATCH} route +2ms
    Mapped {/api/images/:id, DELETE} route +5ms
   [NestApplication] Nest application successfully started +7ms
```

Currently we only have this:

return this.httpClient.get<Trend[]>('http://localhost:3333/api/trends/'+event.payload);

The reason there is no /api/images service yet is that the Nest backend was not returning anything.  It was first designed to get Google or Bing images.  But due to concerns about using licensed images, it's been decided to use the commons instead.  So this is the one we can use.  The current /api/images functionality on the backend can be moved to a new "kickoff" api with should be a post, because it's going to contain the image chose, and the content associated with it, such as the created for and whatever the front end has on the selected image at that point.  It would be appropriate to use the /api/trends, POST endpoint for this.

It will be the form submission that will kick off all the automation.

## commons.wikimedia API

At the bottom of the images searches page there is a "developers" link.

It seems like wikidata is also the place to get these results, which means a SPARQL can be used.  But what that's going to look like remains unclear at this point.

A url looks like this:

```txt
https://commons.wikimedia.org/w/index.php?
search=champions+league&
title=Special:MediaSearch&
go=Go
```

An advanced search on Wikidata could look like this:

```txt
https://www.wikidata.org/w/index.php?
sort=create_timestamp_desc&search=Champions+League+filetype%3Abitmap&
title=Special%3ASearch&
profile=advanced&
fulltext=1&
advancedSearch-current=%7B%22fields%22%3A%7B%22filetype%22%3A%22bitmap%22%7D%7D
&ns0=1&
ns1=1&
ns2=1&
ns3=1&
ns4=1&
ns5=1&ns6=1&ns7=1&ns8=1&ns9=1&ns10=1&ns11=1&ns12=1&ns13=1&ns14=1&ns15=1&ns120=1&ns121=1&ns122=1&ns123=1&ns146=1&ns147=1&ns640=1&ns641=1&ns828=1&ns829=1&ns1198=1&ns1199=1&ns2300=1&ns2301=1&ns2302=1&ns2303=1
```

## SPAQL

To use a SPAQL, we will need to get a q code first.  Here is an example of a search for Images of organic acids:

```sql
SELECT ?compound ?compoundLabel ?image WHERE {
  ?compound wdt:P279+|wdt:P31+ wd:Q421948 ;
            wdt:P18|wdt:P117 ?image .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
```

The Champions League q-code is Q14240570.  However, if you put that q-code in the above query, there are no results.  On the commons page, there are 1,927 results.

Maybe the other w-codes are wrong?

For the organic acid example shown above, the query helper shows two rows, a filter and a show section.

The filter has "subclass of" and "instance of" organic acid.

The show filter has "image" of chemical structure.

So that't why the query doesn't work for the champions league.

But trying this basic one for champions league doesn't work either.

```sql
SELECT ?item ?itemLabel ?pic
WHERE
{
?item wdt:P31 wd:Q146 .
?item wdt:P18 ?pic
SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
}
```

Using the query service, when the above search example is loaded, the filter drop down loads a number of choices such as

- instance of
- field of work
- main subject
...

However, setting the q-code to Q14240570 can be used with instance of, but no other filters will load for it.  It may be because Q14240570 is not specific enough?

## The q-code

How to get the q-code?  We do that somewhere in the Khipu app also.

Also, a search on the Wikidata site for Champions League shows Results 1 – 20 of 2,599.

Results include:

- UEFA Champions League (Q18756) - European association football tournament
- Champions League (Q224610) - Wikimedia disambiguation page
- 2013–14 UEFA Champions League (Q30608) - 2013–14 edition of the UEFA Champions League

So it's not going to be as easy as just doing a search for a string.

## Scrape the HTML

Since the SPAQL search doesn't appear to be easy to figure out, this is the direct approach which is not too much work.  The top of the list and first item looks like this:

```html
<div class="sdms-search-results">
  <div class="sdms-search-results__list-wrapper">
    <div class="sdms-search-results__list sdms-search-results__list--image">
      <a
        ref="link"
        class="sdms-image-result"
        href="https://commons.wikimedia.org/wiki/File:UEFA_Champions_League_2021-2024_Logo.png"
        title="File:UEFA Champions League 2021-2024 Logo.png"
        style="width: 194px;"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UEFA_Champions_League_2021-2024_Logo.png/194px-UEFA_Champions_League_2021-2024_Logo.png"
          data-src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UEFA_Champions_League_2021-2024_Logo.png/194px-UEFA_Champions_League_2021-2024_Logo.png"
              alt="UEFA Champions League 2021-2024 Logo.png"
              loading="lazy"
              class="sd-image"
              style="height: 100% !important; max-width: 1280px !important; max-height: 1189px;"
            >
          </a>
```

So look for the tag with class "sdms-search-results__list--image", and get the list of anchors.

The details query looks like this: Request URL:
https://commons.wikimedia.org/w/api.php?action=query&format=json&uselang=en&inprop=url&pageids=72792295&iiextmetadatalanguage=en&prop=info%7Cimageinfo%7Centityterms&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlheight=180

At lease this will return json.  Maybe there is a way to combine the two?

https://commons.wikimedia.org/w/api.php?action=query&format=json&uselang=en&inprop=url&pageids=72792295&iiextmetadatalanguage=en&prop=info%7Cimageinfo%7Centityterms&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlheight=180

Plus this:

https://commons.wikimedia.org/w/index.php?search=champions+league&title=Special:MediaSearch&go=Go

Equals this:

https://commons.wikimedia.org/w/api.php?action=query&format=json&uselang=en&inprop=url&search=champions+league&title=Special:MediaSearch&iiextmetadatalanguage=en&prop=info%7Cimageinfo%7Centityterms&iiprop=url%7Csize%7Cmime%7Cextmetadata&iiurlheight=180

Results in this: {"warnings":{"main":{"*":"Unrecognized parameters: search, title."}},"batchcomplete":""}

Anyhow, a formatted list of links is not bad for now.

## Current code

This component loads the trends in its ngOnInit hook:

libs\trends\src\lib\containers\trends\trends.component.ts

```ts
  ngOnInit() {
    this.store.dispatch(TrendsActions.loadTrends({payload: 'US'}));
    this.trends$ = this.store.pipe(select(trendsQuery.getTrends));
  }
```

The service:

libs\trends\src\lib\services\trends\trends.service.ts

```ts
  getTrends(event: any): Observable<Trend[]> {
    return this.httpClient.get<Trend[]>('http://localhost:3333/api/trends/'+event.payload);
  }
```

Backend practice file to parse (there is also a test-detail file):

apps\nest-demo\src\assets\test.html

Create a new api to either:

- A - name "text" to hold the text generating api currently in images
- B - named "commons" to handle the commons image search.

We chose A.  The image route code was moved to a new text endpoint.

Now, what's the scaffolding command?

## Creating the backend image search endpoint

nx generate @nestjs/schematics:resource text --sourceRoot apps/nest-demo/src/app

```txt
> nx generate @nestjs/schematics:resource text --sourceRoot apps/nest-demo/src/app
√ What transport layer do you use? · rest
√ Would you like to generate CRUD entry points? (Y/n) · true
"SchematicsNestResource" schema is using the keyword "id" which its support is deprecated. Use "$id" for schema ID.
CREATE apps/nest-demo/src/app/text/text.controller.spec.ts
CREATE apps/nest-demo/src/app/text/text.controller.ts
CREATE apps/nest-demo/src/app/text/text.module.ts
CREATE apps/nest-demo/src/app/text/text.service.spec.ts
CREATE apps/nest-demo/src/app/text/text.service.ts
CREATE apps/nest-demo/src/app/text/dto/create-text.dto.ts
CREATE apps/nest-demo/src/app/text/dto/update-text.dto.ts
CREATE apps/nest-demo/src/app/text/entities/text.entity.ts
UPDATE apps/nest-demo/src/app/app.module.ts
```

Move the text api work there.

Next create a simplle parse function to return the images.  This might be a little too simple, but for now, this is what the endpoint returns:

```js
["<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Christina_Applegate_2%2C_2012.jpg/134px-Christina_Applegate_2%2C_2012.jpg\" data-src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Christina_Applegate_2%2C_2012.jpg/134px-Christina_Applegate_2%2C_2012.jpg\" alt=\"Christina Applegate 2, 2012.jpg\" loading=\"lazy\" class=\"sd-image\" style=\"height: 100% !important; max-width: 557px !important; max-height: 749px;\">",
...
```

This type of thing is a security vulnerability for the man-in-the-middle attack.  But since this app is only a proof of concept to be used locally, shouldn't be a problem for now.  Next, the front end component.

## Create the front end wikimedia image search component

This component loads the trends in its ngOnInit hook:

libs\trends\src\lib\containers\trends\trends.component.ts

The service:

libs\trends\src\lib\services\trends\trends.service.ts

We will need a new store for this.

Instead of creating a new lib, just add new store details for the images.

In trends.actions.ts:
LoadTrends -> LoadTrendImages

Currently, the trend details are handled pretty poorly, within the list, the detail view is shown if a trendDetails is set:

<mat-card *ngIf="trendDetails">

This should be a component itself.  Then the container class can call the new images api when a trend is chosen, and display the trend details in one container, and the commons images in another new container.

Create a component.

nx g @nrwl/angular:component  components/common-images/common-images --project=trends

libs\trends\src\lib\containers\trends\trends.component.ts

Despite the trends-list.component being in the containers directory, it is the dumb component.

trends.component is the container that receives the action when a trend is chosen.

Since we don't have Redux setup for the commons media api results, we use the service directly in the trends.component.

The TrendsService should be used in libs\trends\src\lib\+state\trends.effects.ts.

However, loading the data outside the effect doesn't seem to work:

```js
this.trendsService.getCommonsImages(trendTitleQuery).pipe(
  map((images: Trend[]) =>
    console.log('commons image results', images)
  ),
  catchError((error) => of(TrendsActions.loadTrendsFailure({ error })))
);
```

Just subscribing to the service works.  But the next issue is that a lot of trends wont have any results without some kind of help.

For example, this trend:

9h ago Timberwolves Cruise In Opener Over Houston by Drgnews in MINNEAPOLIS (AP) - "Anthony Edwards energized the first full-size home crowd of his nascent career with 29 poin..."

Obviously this is not a story about the timber wolves animals.  This is a sports team.

However, Wikimedia doesn't know this, and it might now work.  In this case it does:

https://commons.wikimedia.org/w/index.php?search=Timberwolves&title=Special:MediaSearch&go=Go

The results are returned here:

Request URL: http://localhost:3333/api/images/Timberwolves

Crown Jewel 2021 however is literally translated as the jewels, when in fact the search is a sports team again: "Big E will defend his newly won WWE Championship against Drew McIntyre in the sub-main event, while Goldberg returns to face Bobby Lashley in a SummerSlam&nbsp;..."

https://commons.wikimedia.org/w/index.php?search=Crown Jewel 2021&title=Special:MediaSearch&go=Go

## Old notes from trends.md (temporary)

These might be needed if it's decided to put the temporary images results from the commons image search.  Since only the chosen trend is important, we don't really need to at this point.

### [Step 11 - Adding NgRx to Nx App](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/11-adding-ngrx-to-nx-app)

Do we need to do this for trends or wait for step 15?

```txt
nx g @nrwl/angular:ngrx --module=apps/customer-portal/src/app/app.module.ts  --minimal false
? What name would you like to use for the NgRx feature state? An example would be "users". products
? Is this the root state of the application? No
? Would you like to use a Facade with your NgRx state? No
```

## [Step 14 - NgRx Selectors](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/14-ngrx-selectors)

1. Add selector file
2. Use selector in Layout component

Add a file called index.ts to the +state folder of your auth state lib

libs/auth/src/lib/+state/products.selectors.ts

## [Step 15 - Add Products NgRx Feature Module](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/15-add-products-ngrx-feature-module)

```txt
PS C:\Users\timof\repos\hits> nx g @nrwl/angular:ngrx --module=libs/trends/src/lib/trends.module.ts --minimal false
√ What name would you like to use for the NgRx feature state? An example would be "users". · trends
√ Is this the root state of the application? (y/N) · false
√ Would you like to use a Facade with your NgRx state? (y/N) · false
CREATE libs/trends/src/lib/+state/trends.actions.ts
CREATE libs/trends/src/lib/+state/trends.effects.spec.ts
CREATE libs/trends/src/lib/+state/trends.effects.ts
CREATE libs/trends/src/lib/+state/trends.models.ts
CREATE libs/trends/src/lib/+state/trends.reducer.spec.ts
CREATE libs/trends/src/lib/+state/trends.reducer.ts
CREATE libs/trends/src/lib/+state/trends.selectors.spec.ts
CREATE libs/trends/src/lib/+state/trends.selectors.ts
UPDATE libs/trends/src/lib/trends.module.ts
UPDATE libs/trends/src/index.ts
```

2. Add Products Action Creators

3. Add default state and interface

4. Make new Product interface

5. Make new ProductsService in products module

```txt
nx generate @nrwl/angular:service --project=trends
services/trends/trends
```

This the url to call from the NestJS backend:

http://localhost:3333/api/trends

7. Add reducer logic

This is wrong:

```js
import { loadProducts } from './../../+state/products.actions';
...
this.store.dispatch(loadProducts());
```

And after all that, this is the error from the effects:

```js
Type 'Observable<unknown>' is not assignable to type 'EffectResult<Action>'.
  Type 'Observable<unknown>' is not assignable to type 'Observable<Action>'.
    Property 'type' is missing in type '{}' but required in type 'Action'.ts(2322)
```

That's the error we got in step 19 for fixing the unit tests when trying to use the init action in the test.

The solution there was:

instead of using "Product []", just use "[]".

That is not the situation here.  Another [StackOverflow answer](https://stackoverflow.com/questions/57247613/ngrx-effects-type-observableunknown-is-not-assignable-to-type-observable) to the rescue:

```txt
comment out createEffect(() =>,
fix errors that your IDE (VSCode) flags up,
add createEffect(() => back in.
```

The error is that the service was still getProducts().  Change that to getTrends() and the error is gone.

Next, dump out the trends result.  Run the server, run the app, and our api has this in the network tab:

```txt
Referrer Policy: strict-origin-when-cross-origin
```

The answer to that is [here](https://docs.nestjs.com/security/cors):

```js
const app = await NestFactory.create(AppModule);
app.enableCors();
```

Add the enable cors line and, voila, who's Bob?

The output is something like this:

```json
"default":{
  "trendingSearchesDays":[
    {
      "date":"20210804",
      "formattedDate":"Wednesday, August 4, 2021",
      "trendingSearches":[
        {
          "title":{
            "query":"Verzuz",
            "exploreLink":"/trends/explore?q=Verzuz&date=now+7-d&geo=US"
          },
          "formattedTraffic":"20K+",
          "relatedQueries":[
          ],
          "image":{
            "newsUrl":"https://www.tomsguide.com/news/how-to-watch-verzuz-the-lox-vs-dipset-on-instagram-live-and-triller",
            "source":"Tom's Guide",
            "imageUrl":"https://t0.gstatic.com/images?q=tbn:ANd9GcSO408JTF6mZnkA1xWG654XYf54lnLFdADpcy8SCxjygytBy4yQ6QyQQ3rnk5oi6UjYDGiuNvdV"
          },
          "articles":[
            {
              "title":"How to watch Verzuz: The LOX vs Dipset on Instagram Live and Triller",
              "timeAgo":"7h ago",
              "source":"Tom's Guide",
              "image":{
                "newsUrl":"https://www.tomsguide.com/news/how-to-watch-verzuz-the-lox-vs-dipset-on-instagram-live-and-triller",
                "source":"Tom's Guide",
                "imageUrl":"https://t0.gstatic.com/images?q=tbn:ANd9GcSO408JTF6mZnkA1xWG654XYf54lnLFdADpcy8SCxjygytBy4yQ6QyQQ3rnk5oi6UjYDGiuNvdV"
              },
              "url":"https://www.tomsguide.com/news/how-to-watch-verzuz-the-lox-vs-dipset-on-instagram-live-and-triller",
              "snippet":"New York will definitely in the building when we watch Verzuz: The Lox vs Dipset live stream tonight. Yes, the iconic rap groups are taking to the stage at MSG ..."
            },
            {
              "title":"The LOX announces tour with Dipset ahead of Verzuz battle",
              "timeAgo":"13h ago",
              "source":"REVOLT TV",
              "image":{
                "newsUrl":"https://www.revolt.tv/news/2021/8/3/22608261/the-lox-announces-tour-with-dipset",
                "source":"REVOLT TV",
                "imageUrl":"https://t2.gstatic.com/images?q=tbn:ANd9GcRj_marJGJ8Fs6oly4msViSHHLw4TsFZM4WLRyW5O5tMTMB3VugFfmADng1gSV-4bH4ymIjkalp"
              },
              "url":"https://www.revolt.tv/news/2021/8/3/22608261/the-lox-announces-tour-with-dipset",
              "snippet":"According to Sheek Louch, the tour is slated to start this fall."
            },
          ],
          "shareUrl":"https://trends.google.com/trends/trendingsearches/daily?geo=US&tt=Verzuz#Verzuz"
        }
      ]
    },
  ]
}
```

We have configured the backed to just send the result, but maybe we should do this:

```js
const defaultObj = JSON.parse(Object(results)).default
  .trendingSearchesDays[0].trendingSearches;
```

This will miss out on the previous days results:

{"default":{"trendingSearchesDays":[{"date":"20210807", ...

Since we don't have a plan for that yet, it's not such a big deal.

## 16 - Entity State Adapter

There is some funny stuff going on in this step also.

For example, this code example is split in between the file path and code:

4. Add selector methods to bottom of reducer

Same with the next step:

2. Add material module to Products module

Also need the file path for this:

```html
<div fxLayout="row"  fxFlexLayout="center center">
  <demo-app-product-list [products]="products$ | async"></demo-app-product-list>
</div>
```

### 17 - Router Store

Everywhere we see the scaffolding command and the output, we need to remove it so that the copy functionality just copies the cli command, not the output.

```txt
nx generate @nrwl/angular:component containers/product-list --project=products
CREATE libs/products/src/lib/containers/product-list/product-list.component.html
CREATE libs/products/src/lib/containers/product-list/product-list.component.spec.ts
CREATE libs/products/src/lib/containers/product-list/product-list.component.ts
CREATE libs/products/src/lib/containers/product-list/product-list.component.scss
```

That should be:

```txt
nx generate @nrwl/angular:component containers/product-list --project=products
```

```txt
CREATE libs/products/src/lib/containers/product-list/product-list.component.html
CREATE libs/products/src/lib/containers/product-list/product-list.component.spec.ts
CREATE libs/products/src/lib/containers/product-list/product-list.component.ts
CREATE libs/products/src/lib/containers/product-list/product-list.component.scss
```

```txt
nx generate @nrwl/angular:component containers/trends-list --project=trends
```

I'm changing my mind about using the entity adapter for the trends.

We don't really care about searching it.  It's just a temporary list.

Reverting these changes and going back to the basic API working from yesterday.

Will need to re-do the tends-list at least and the nest service.

Next I suppose is added another route for the google image search.

Or, just, like, a details of the existing trend info?

But first, update the load trends functions to take a country name and use that in the api.

The [country code list](https://github.com/datasets/country-codes/blob/master/data/country-codes.csv) are listed here, but for now, just the US and Australia will do.  Apparently, SEO should be done by country, and it's to be determined how the app can be deployed by country to achieve this.

This part of the app doesn't have to be by country of course, but the result of it should.

I think we will need a new effect for the trend by country.  Currently there is only $login.


