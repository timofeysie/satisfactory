# Trends

The Trendy front end was not able to be build an deployed as a SSR Angular Universal app, so was moved to a working solution in the Tundra app.  Here are the workflow commands.

```hs
nx run trendy:build --configuration=production
nx serve trendy // trendy frontend
nx run trendy:server --configuration=production
nx run trendy:build:SSR
nx run trendy:serve:SSR
nx run trendy:firebase --cmd deploy // deploy to firebase
```

## The backend

This document describes setting up [google-trends-api](https://www.npmjs.com/package/google-trends-api#dailyTrends).

```txt
nx generate @nestjs/schematics:resource trends --sourceRoot apps/nest-demo/src/app
```

The docs show using require:

```js
const googleTrends = require('google-trends-api');
```

The TypeScript was to do this in the apps\nest-demo\src\app\trends\trends.service.ts

```js
import * as googleTrends from 'google-trends-api';

findAll() {
    return googleTrends.dailyTrends(
      {
        trendDate: new Date(),
        geo: 'US',
      },
      function (err, results) {
        if (err) {
          return err;
        } else {
          return results;
        }
      }
    );
  }
```

Now, about that callback.

## The front end

The same steps that went into making the products lib in [step 9 - Route Guards and Products Lib](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/9-route-guards-and-products-lib) can be repeated here to build out the trends front end.

Here are the commands to create the lib and a container.

```txt
nx generate @nrwl/angular:lib trends --routing --lazy --parent-module=apps/customer-portal/src/app/app.module.ts
nx g @nrwl/angular:component  containers/trends --project=trends
```

Next add a route.here: apps/customer-portal/src/app/app.module.ts

The data models can be shared via a [library](https://docs.nestjs.com/cli/libraries).

Update the ProductsModule route here: libs/trends/src/lib/trends.module.ts

```js
RouterModule.forChild([
  { path: '', pathMatch: 'full', component: TrendsComponent },
]),
```

Add a button to the header: libs\layout\src\lib\containers\layout\layout.component.html

We don't need to do anything to the route guard to protect trends page: libs/auth/src/lib/guards/auth/auth.guard.ts

But we need to add this to apps\customer-portal\src\app\app.module.ts

```js
canActivate: [AuthGuard],
```

## Extras

1. Add logout functionality
2. Add angular interceptor

### Logout

We already have a logout button, but it currently does nothing.

There are some brief instructions for this:

- Done - Add logout button to main menu
- Call service and logout the user by clearing the behavior subject
- Navigate to login page

But, we don't actually have container and presentational components for layout.  It just routes directly to the pages, so no emitter to a container is used yet.

The extras from step 8 were:

1. Convert Layout component into a pure container component
2. Add a toolbar presentational component.
3. Pass user into presentational component via inputs.

Since we're impatient now, not going to do this yet.  If this project turns out to be worth while and pays for itself, by all means, make it happen.

For now, just make the logout work.  Luckily, we already did that in the Clades project.

```html
      <button mat-button (click)="logout()"
        [routerLink]="['/auth/login']">Logout</button>
```

```js
logout() {
  this.authService.logout();
  this.user$ = this.authService.user$;
  // TODO:  Was part of 9 extra credit originally
  // this.store.dispatch(AuthActions.logout();
  // this.user$ = this.store.select(getUser);
  // will update this as part of 14 - selectors.
}
```

And in the AuthService:

```js
logout() {
    localStorage.setItem('user', null);
    this.userSubject$ = new BehaviorSubject<User>(null);
    this.user$ = this.userSubject$.asObservable();
  }
```

Who's Bob?

Might leave the auth.interceptor.ts for later.

## [Step 11 - Adding NgRx to Nx App](https://duncanhunter.gitbook.io/enterprise-angular-applications-with-ngrx-and-nx/introduction/11-adding-ngrx-to-nx-app)

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

1. Add NgRx Products lib making it a state state

Still not sure about this for trends as seen in step 11:

nx g @nrwl/angular:ngrx --module=apps/customer-portal/src/app/app.module.ts  --minimal false

This one is from step 15:

nx g @nrwl/angular:ngrx --module=libs/products/src/lib/trends.module.ts --minimal false

The trends version would be:

nx g @nrwl/angular:ngrx --module=libs/trends/src/lib/trends.module.ts --minimal false

Lets just go with that for now.

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

### Calls limit

When trying to get multiple calls done, I ran into a limit.  I paid for the first paid tier but now have the issue of the subscription key and API endpoints to use for that.

The account was not upgraded as I thought would happen to allow the current settings to perform more searches per second.

trend-group-resource

custom-search-instance has "Custom Configuration ID": 82200724-d9ea-42dc-bb0e-a95fc751f447

https://www.customsearch.ai/application/4916b346-f8c3-46cf-93f3-c61f5b5d0d01/prod/endpoint

That's what I am using for the customConfigId.

Now what is the subscriptionKey I should be using along with that?

There was a discussion about that in the image-search.md file.

'Ocp-Apim-Subscription-Key': subscriptionKey,

In the trends-resource group:
https://portal.azure.com/#home

There is Have four resources, all with api keys:
trend-group (a resource group the is the umbrella for the next three)
trend-group-resource
image-search ...68e
trends ... 8a6

subscriptionKey1="...8a6"

Ocp-Apim-Subscription-Key = The subscription key that you received when you signed up for this service in Cognitive Services.

In my Subscriptions portal tab
There is a Pay-As-You-Go active.

Using the imageSearch SubscriptionKey

  error: {
    code: '401',
    message: 'The Search Operation under Custom Web Search API is not supported with the current subscription key and pricing tier Bing.Bundle.F1.'
  }

Using the trends SubscriptionKey seems to work.

But after four searches, we get the a message.

trendGroupSubscriptionKey

  error: {
    code: '429',
    message: 'Requests to the Search Operation under Custom Web Search API have exceeded rate limit of your current Bing.CustomSearch F0 pricing tier. Please retry after 1 second. To increase your rate limit switch to a paid tier.'
  }

I did pay for something last night.  I clicked the "Click to issue paid tier key" in the production tab of the Custom Search app:
https://www.customsearch.ai/application/4916b346-f8c3-46cf-93f3-c61f5b5d0d01/prod/endpoint

The F1 resource sounds higher, but why the error?

YutongTie-MSFT · Jul 11 2021 at 9:29 AM
*Hello, Thanks for reaching out to us. I think the error that is caused in this case is because of the bing search resource that is used for this call. Bing resources migrated from cognitive services to bing in october 2020 and if you are using a key of the instance that is created previously such error could be seen. You can try to create a new custom search resource by using the issue paid key option from the screen shot or try out a free trial key if you are eligible. Trying out a new key worked for me because my older resources of bing were under a different pricing plan as the resources were created under cognitive services namespace.*

What?

Due to the bing search resource that is used for this call.
Bing resources migrated from cognitive services to bing in october 2020 and if you are using a key of the instance that is created previously such error could be seen.

I have created these resources all recently.

You can try to create a new custom search resource by
using the issue paid key option from the screen shot or try out a free trial key if you are eligible.

The exact same text was used to reply to another user. by romungi-MSFT answered • Apr 13 2021 at 12:02 AM

Great service there Bing.

Anyhow, using the trendGroupResource SubscriptionKey

  error: {
    code: '401',
    message: 'The Search Operation under Custom Web Search API is not supported with the current subscription key and pricing tier Bing.Bundle.S1.'
  }

trendGroupResource: pricing tier Bing.Bundle.F1
trendGroupResourceSubscriptionKey: pricing tier Bing.Bundle.S1
trendGroupSubscriptionKey: Bing.CustomSearch F0 pricing tier

trend-group-resource ...b85
image-search ...68e
trends ... 8a6

Looks like all the bases are covered there.

What is the difference between S1 and F1?

Standard S1 is 100 calls per second.  So defo we want to use that one.  We will need that.  Otherwise it's time to cancel the account and just do our own scraping with cheerio.

Using that S2 key still results in this:

```json
{
  error: {
    code: '401',
    message: 'The Search Operation under Custom Web Search API is not supported with the current subscription key and pricing tier Bing.Bundle.S1.'
  }
```

[This answer](https://docs.microsoft.com/en-us/answers/questions/265258/bing-custom-search-not-supported-with-current-subs.html): *the url needed to include '/custom', and I also needed to pass in customConfig and mkt in the params.*

But we already have custom in our search:

```json
info {
  url: 'https://api.bing.microsoft.com/v7.0/custom/search?q=Kylie%20Jenner&customconfig=82200724-d9ea-42dc-bb0e-a95fc751f447&offset=0',
}
```

Ironically, if custom is removed, then the search works, and our file gets written!

Kylie Jenner with five iterations results in 247 lines of text.

Bumping that up to 15 searches gives us 738 lines of text.  Time to give that a run through the training.

Also have to test out using just the hemingway text via training to see if that works as well as the previously trained model, as a kind of control group.

There was no raw data for that file.  I added the Wikipedia page for Kylie which we will be able to get, and this was the output:

Input :Kylie and "what Jenner of lying of is in August 10 bealicy tolest of a big new adventure choose your own path."

That will do, that will do!

So we will have to bump up the iteration to as much as we can get, add a Wikipedia parse, and then, it's off to the races with the image generation!
