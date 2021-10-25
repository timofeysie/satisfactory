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

How many pictures will there be?  This could be an "Add" button which adds a new record.

The default one is a ML generated image and title.  But there could be none.  For example, if an artist just wants to add a picture with no ML version.  That's fine.  So a select is good.

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

The description might also be different.  Right now, there is:

- manual
- LSTM

### The current data model

```js
  Champions_League: {
    pageTitle: 'UEFA Champions League',
    author: 'Transition Cat, Toonify',
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

nx g @nrwl/angular:component  components/trends-list-detail/trends-list-detail --project=trends

Currently, we have a bit of a mix-up of hierarchy

```html
<div fxLayout="row" fxFlexLayout="center center">
  <demo-app-trends-list></demo-app-trends-list>
  <demo-app-common-images [images]="commonImages"></demo-app-common-images>
</div>
```

The trends list controls the toggle of the detail view, but really, that should be done in the trend component.  There should just be a boolean or something called detailChosen which then toggles the sub-components.  And as part of this, include the free front-awesome icons instead of the hacky back arrow that's going on right now.

That back icon should be in the container, because it will control he back view for all it's children components, which are the elements on the trend form.  We can do that by lifting the back icon and it's click function out of the list and into the trends container.

### Preview mode

The trend form should also have a preview component, which will show the front end render of the json being developed to show the topic page.  This unfortunately is in another project.  If you read all the docs regarding ssr and Angular Universal struggles that happened here in this project, you will know that failed.  After weeks of work trying to understand ssr and deployment via Google cloud, a working repo from someone else was used to deploy to heroku.

So now instead of being able to use that lib, we are not able to share those components.  We could copy all the work done here to there.  Or we could give the angular-fire another try.

The three main sections of the for could be considered like this:

1. trend detail search results
2. pre-fill data and edit form
3. preview what the post will look like
