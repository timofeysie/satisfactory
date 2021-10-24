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
