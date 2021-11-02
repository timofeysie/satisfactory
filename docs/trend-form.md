# Trend Form

There are four areas proposed and a form section that could be shown on what is currently the trends.component.

1. The Google Trends brief results list
2. The commons.wikimedia image results list
3. The top of the Wikipedia page
4. AP articles link?
5. The description form: title, description, category, image content?

Each of the for sections can have controls which currently are envisioned as check-boxes ot other widgets:

- Google Trend details list
  (select all text)

- Wikimedia Commons image list
  (Chose image for ML)
  (disambiguation search)

- Wikipedia description
  (Copy text to description)
  (Copy link for description)
  (disambiguation search)

- AP News search
  (copy link to description)
  (copy text for description)

## The form

The properties needed to populate a json object used by the front end to display the topic.

In addition we want:

How many pictures will there be? This could be an "Add" button which adds a new record.

The default one is a ML generated image and title. But there could be none. For example, if an artist just wants to add a picture with no ML version. That's fine. So a select is good.

Type:

- ML
- Artist

Imagine if we want a page with all four of the current models:

Hosoda
Hayao
Paprika
hinkai
All

Since we might want to choose after we see all four ML generated versions, the "All" would allow this.

The description might also be different. Right now, there is:

- manual
- LSTM

### The current data model

```js
  Champions_League: {
    pageTitle: 'UEFA Champions League',
    authors: 'Transition Cat, Toonify',
    keywords: 'UEFA Champions League, artwork',
    description: `...`,
    linkUrl: 'https://en.wikipedia.org/wiki/UEFA_Champions_League',
    linkLabel: 'Wikipedia',
    one: {
      title: 'Champions League by Toonify',
      author: 'Toonify',
      altText: 'Champions League by Toonify',
      imageSrc:
        './../assets/pictures/Champions-League/UEFA_Champions_League_Hosoda.jpg',
      srcset: ``,
      description: `...`,
      tags: 'UEFA,Champions,League,toonify',
      source:
        'https://commons.wikimedia.org/wiki/File:Trofeo_UEFA_Champions_League.jpg',
    },
  },
};
```

So we need to add the type of image, and the type of description maybe also.

## Organizing the form

First we need to move the component for the details out of the trends-list container, as it should be a dumb component.

nx g @nrwl/angular:component components/trends-list-detail/trends-list-detail --project=trends

Currently, we have a bit of a mix-up of hierarchy

```html
<div fxLayout="row" fxFlexLayout="center center">
  <demo-app-trends-list></demo-app-trends-list>
  <demo-app-common-images [images]="commonImages"></demo-app-common-images>
</div>
```

The trends list controls the toggle of the detail view, but really, that should be done in the trend component. There should just be a boolean or something called detailChosen which then toggles the sub-components. And as part of this, include the free front-awesome icons instead of the hacky back arrow that's going on right now.

That back icon should be in the container, because it will control he back view for all it's children components, which are the elements on the trend form. We can do that by lifting the back icon and it's click function out of the list and into the trends container.

After making two components, there are still two containers.

The trend-list.component is the container for the trend-list-detail.component.
The trends.component is a parent for both of them and common-images.component. It seems like there should be only one container and three components, but let's leave the refactoring for now.

Instead of calling APIs and parsing the Wikipedia and AP News sites, lets just go with creating the links for now. It could be a huge rabbit hole trying to do too much at this point. The ads are still not working and neither is the seo, so the sooner we get back to those, the better.

### Preview mode

The trend form should also have a preview component, which will show the front end render of the json being developed to show the topic page. This unfortunately is in another project. If you read all the docs regarding ssr and Angular Universal struggles that happened here in this project, you will know that failed. After weeks of work trying to understand ssr and deployment via Google cloud, a working repo from someone else was used to deploy to heroku.

So now instead of being able to use that lib, we are not able to share those components. We could copy all the work done here to there. Or we could give the angular-fire another try.

The three main sections of the for could be considered like this:

1. trend detail search results
2. pre-fill data and edit form
3. preview what the post will look like

## Getting started

Angular has a few types of forms, but the basic two are template driven and reactive forms. The latter are dynamic forms where you can add or remove controls at run time, which is what we need.

Add the forms [from the docs](https://angular.io/guide/reactive-forms) using the FormBuilder service provides which convenient methods for generating controls.

Might also look at [this article: The Best Way to build reactive sub-forms with Angular](https://tomastrajan.medium.com/angular-reactive-sub-forms-type-safe-without-duplication-dbd24225e1e8).

The big decision is if the form will be held in the trends.component or the trends-list. I'm not sure what the presenter container component patterns says about Angular forms. This module already seems messed up, so either way, it wont improve the situation.

Will go with the top level just because that's where the back button is, and we may need to add a cancel, and preview mode there, and the form mode could replace the simple toggle then.

Another component is needed to hold the news link sections. These will also contain check boxes to include content as part of other form elements.

nx g @nrwl/angular:component components/trends-links/trends-links --project=trends

That helps clean up the trends container. Next, we need to pass down the form controls into the trends-link component.

### AP New Links

I'm not sure where the idea came from that the hub link could contain a topic.

AP TOP NEWS: https://apnews.com/hub/

Trending News: https://apnews.com/hub/trending-news

Not found: https://apnews.com/hub/comet's%20death%20dive

This is how an article link should look:

https://apnews.com/article/space-exploration-science-business-asteroids-9f1c3bda00e4d35bb89ff132ffcd340f

So we should allow the user to find a link on AP news and set that as a link on their post.

## The Form Group

This error is arising after using the form group and builder to create the sections of the form:

```txt
core.js:6456 ERROR Error: formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).
      Example:
    <div [formGroup]="myGroup">
       <div formGroupName="person">
          <input formControlName="firstName">
       </div>
    </div>

    In your class:

    this.myGroup = new FormGroup({
       person: new FormGroup({ firstName: new FormControl() })
    });
    at Function.groupParentException (forms.js:1439)
    ...
    at TrendsLinksComponent_Template (trends-links.component.html:38)
    at executeTemplate (core.js:9575)
```

Apparently it's coming from using [(ngModel)]="newNewsLink" with formControlName. Or so I thought. The solution was actually from [an answer on this SO](https://stackoverflow.com/questions/45822266/formcontrolname-must-be-used-with-a-parent-formgroup-directive) by using the viewProviders annotation.

```js
@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
```

Actually, both solutions were needed. We can also use ngModel in the form. So they will have to be updated with onclick actions.

### The image and type

If the user is creating a ML image, then the source should be from the Wikimedia Commons, which is an image tag.

If it's going to be a user created image, then it can be from anywhere, such as a Google images search which would look like this if you choose the image source:

https://www.nydailynews.com/resizer/b3CKjC6IX4-Gon-bRJX0xq3CWn0=/1200x0/top/cloudfront-us-east-1.images.arcpublishing.com/tronc/QI6WP777KJC67G44KAI4EXKE54.jpg

We don't really know which kind of entry will be at first until the user tells us. Not sure when to ask that. I suppose, if we want to support all kinds, then we need to be careful here.

If the user wants to create two ML images, both using different images, then how is that going to work? We only have the ability to choose one commons image right now.

The only idea I can come up with right now is to ask the user how many pictures they want on the post, and which type they are, and then somehow go through them one at a time to get as much data as possible.

There are two or three basic types right now. Given that there is no more automation set up yet, it's basically two:

1. ML
2. Artist

The ML could be any of four types of models, but this is still a manual step, so it's the same thing: the user will have to manually generate the images using a Python script and then add the link to the generated image manually. The description is the same story.

The artist version requires that the artist provide the image, title and the description.

Keywords?

Anyhow, we need another card which can hold the basic info of type and pic used. For that that can be set by the pic chosen when in add button action. An artist version can have an extra input on add to choose the image that they want to use as their source material. The main thing with this choice is that both pictures chosen, for now, should have the same aspect ration. So we should give a hint if there is a portrait or landscape mismatch, for example.

nx g @nrwl/angular:component components/topic-form/topic-form --project=trends

For some reason I thought that the format was dir/dir/comp name. But it looks like it's dir/comp name, but just VSCode shows the first dir with more than one file in it, and so it can look like the first format. Will have to do a commit to get rid of those extra directories.

While we're at it, how about getting the trends toolbar out of the container and put it where it belongs in a component.

So this time, no extra internal directory.

nx g @nrwl/angular:component components/trends-toolbar --project=trends

### The form modes

These are getting pretty messy. There is the

1. trend list mode
2. trend detail selected mode (aka setup)
3. the full form mode

The list mode is triggered by the absence of a selected trend. The next two are know by a boolean flag. There is also the common images loading state on the details selected mode that is determined by a combination of variables. So that's a mess caused by piling on modes without planning, and not keeping the common images results in the store.

The messy part is also that the trend.list.component is a container, and is toggled by the peer container, trend.component.

```js
private trendsListDetail: TrendsListComponent;
...
  onHandleBackToList() {
    this.commonImages = null;
    this.trendTitleSeen = null;
    if (this.trendsListDetail) {
      this.trendsListDetail.backToList();
    }
  }
```

The peer trend.component will then call this function on the trend-list.component:

```js
  backToList() {
    this.trendDetails = null;
  }
```

But for some reason, after going to the form, and coming back to the trend selected setup mode, the trends list is shown, and not the selected trend, as if it has forgotten the trendDetails.

What, the trend-list has been taken out of the DOM so this is lost? So we need to move the control of that into trends.component.

And ideally, we should put trends-list.component into the components directory and have only one container to avoid this mess.

After the the first part of the above, everything works. But save the refactoring to later, as it's time over for dev work today.

## The full trend topic post creation form

The topic-form is shown in the setup trend-selected mode. It is currently fixed to the one/two format of ths current system. This should change in the future to just an array of posts that would allow one or more posts.

But since we are stuck in the "A.I. vs. Artist" mindset right now, that will have to wait for a future phase of development.

For now, we need a big form that will show all the common stuff at the top, and the one/two sections below.

nx g @nrwl/angular:component components/post-creation-form --project=trends

After copying the topic-form setup, we are right away back to this sprawling error:

```err
core.js:6456 ERROR TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'FormGroup'
    |     property 'controls' -> object with constructor 'Object'
    |     property 'pageTitle' -> object with constructor 'FormControl'
    --- property '_parent' closes the circle
    at JSON.stringify (<anonymous>)
    at JsonPipe.transform (common.js:4805)
    at Module.ɵɵpipeBind1 (core.js:25808)
    at PostCreationFormComponent_Template (post-creation-form.component.html:2)
```

Line 2 seems harmless enough:

{{ topicForm | json}}

Remove the json pipe and the error is gone, and we just see the [object Object] printed out.

Next, add a card format and formGroupName="trendForm" and we see this new error:

```err
core.js:6456 ERROR NullInjectorError: R3InjectorError(TrendsModule)[FormGroupDirective -> FormGroupDirective -> FormGroupDirective -> FormGroupDirective]:
  NullInjectorError: No provider for FormGroupDirective!
```

According to a later answer on [this SO post](https://stackoverflow.com/questions/39104592/no-provider-for-formgroupdirective-in-angular-2-nested-custom-component/39104633) we need this:

```js
providers: [FormGroupDirective];
```

The next error then is this:

```err
​ ERROR TypeError: Cannot read properties of null (reading 'get')
    at FormGroupDirective.getFormGroup (vendor.js:73474)
```

That's due to having the wrong form group name, or so it seemed. Using the right name doesn't make the error go away.

One suggestion is to rename the form input. Worth a try.

The form is named "topicForm = this.fb.group({ ... }) in the trends.component.

Change the name it is passed in to the full form to:

```html
<demo-app-post-creation-form
    [fullTopicForm]="topicForm"]="topicForm" ...
```

This doesn't change the error. Do we need both formGroup and formGroupName?

Putting the formGroup in the parent container, and the formGroupName in the child component changes the error to:

```err
core.js:6456 ERROR TypeError: this.form._updateTreeValidity is not a function
    at FormGroupDirective._updateDomValue (forms.js:5342)
```

Searching for this error turns up a StackOverflow answer, the first on [this question](https://stackoverflow.com/questions/40898056/typeerror-this-form-updatetreevalidity-is-not-a-function) by Ben Winding (reputation 5,800) which provides a hint for the solution.

Having a new name for the passed in form, and using brackets (go figure) fixes the errors.

```html
<mat-card-content [formGroup]="fullTopicForm"></mat-card-content>
```

Next, a lot of the form inputs can be setup in the parent based on all the content in the trend detail components. Also, we need to know see all the fields in the full form page.

The we should be able to submit the form as a new json object.

After that we need an endpoint in the nest backend to get that and write a file with it. Eventually, when this app is part of the front end posts app, it can add a route to a routing file, and once the py scripts are automated to generate the ML art and description, all that would need doing is to deploy the app, which I assume can be automated and controlled by the nest app, though I'm not sure how.

Then, there are the missing ads and the failing SEO. Nice way to point out how much further is to go man!

Anyhow, don't get ahead of ourselves. Here is the first input:

```html
      <mat-label>title</mat-label>
      <input matInput  value="pageTitle" formControlName="pageTitle" />
    </mat-form-field>
```

Pre-filling the forms from the parent container is done like this:

```js
  onHandleShowForm() {
    this.topicForm.controls.pageTitle.setValue(this.trendTitleSeen);
```

The keywords can be pre-filled with title + RELATED QUERIES. The latter is shown on the detail view of the Google trends page. Are we getting that with our url also? This could be a very important field for SEO.

This is the api call to the backend: http://localhost:3333/api/trends/

The result does include these when available:

```json
"relatedQueries":[
  {"query":"Ruggs",
  "exploreLink":"/trends/explore?q=Ruggs&date=now+7-d&geo=US"},
  {"query":"Henry Ruggs III",
  "exploreLink":"/trends/explore?q=Henry+Ruggs+III&date=now+7-d&geo=US"}
],
```
