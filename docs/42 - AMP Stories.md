# AMP Stories

## Content needed

```txt
title="Example AMP Story in Next.js"
publisher="AMP Project"
publisher-logo-src="https://amp.dev/favicons/coast-228x228.png"
poster-portrait-src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg"
poster-square-src="0"
poster-landscape-src="https://amp.dev/static/samples/img/story_dog2_landscape.jpg"
```

Then there is the content for each page, such as this:

<https://amp.dev/static/samples/img/story_dog2.jpg>

### Publisher content

We still don't have a decision on the publisher.  Should this be the author?  No.

Should this be hard-wired?  It should be the site name I think, such as Tundra 64, our demo SSR site.

Either it needs to be in the json, which means duplicating this info in every file.

Or, we could have a publisher.json with such details used in each story.  Something like this:

```json
{
  publisherName: "Tundra 64",
  publisherLogoSrc="https://one-public-bucket.s3.ap-southeast-2.amazonaws.com/broken-image-228x228.png"
}
```

#### publisher-logo-src

publisher-logo-src="https://amp.dev/favicons/coast-228x228.png"

Looks like we will have to upload our favicon.

The broken image favicon is only 48 x 48.  Also, it's an ico format.  Fire up Gimp.  Our new url to use then:

<https://one-public-bucket.s3.ap-southeast-2.amazonaws.com/broken-image-228x228.png>

### Poster content

These are new content for this project.  Probably we just want cropped parts of the image.

Or the user needs to be allowed to choose/create one.  Since we are going definitely want multiple images for stories, starting with the current one/two images captured, a choice would be nice.

But then again, everything should be as automated as possible, which means these will need to be created.

```txt
poster-portrait-src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg"
poster-square-src="https://amp.dev/static/samples/img/story_dog2_square.jpg"
poster-landscape-src="https://amp.dev/static/samples/img/story_dog2_landscape.jpg"
```

## amp-story-bookend

This is in the sample, but not sure what it was for.

```html
<amp-story-bookend
  src="https://amp.dev/static/samples/json/bookend.json"
  layout="nodisplay"
/>
```

The notes for this section say:

**A "bookend" panel containing links to other resources will appear on the last page of your story if you include an `amp-story-bookend` that references a [bookend JSON config](/static/samples/json/bookend.json).*

But it looks like it's [deprecated and has already been replaced](https://github.com/ampproject/amphtml/issues/33218)

*The bookend was initially created to allow surfaces to provide hyperlinks within stories. Since then, we have added many new surfaces for links to live in: <amp-story-cta-layer>, <amp-story-grid-layer>, and <amp-story-page-attachment>. These link types make the bookend's linking capabilities redundant with what is already supplied at the page level in the format.*

*For these and other reasons specified in the I2R, we consider the bookend a legacy feature that is no longer serving its purpose, and intend to deprecate it accordingly.*

So our dog-demo might not be the best demo to be going off.  But it's a good start I suppose.

Anyhow, there is no

I have no idea what is in the /bookend.json file.  That's not in the Preact project.  What was the source for that dog-demo again?

I guess [this is the source](https://www.section.io/engineering-education/creating-your-first-google-web-story/), although the excessive notes don't say where it came from.

The article date is: May 19, 2021

The article has [a repo here](https://github.com/Jethro-magaji/Web-Story-Hello-World), however, there is no bookend.json file there.

Then I notice that the file is not a path, it's a url (so much for 'detail oriented'):

<https://amp.dev/static/samples/json/bookend.json>

```json
{
  "bookendVersion": "v1.0",
  "shareProviders": [
    "email",
    "twitter",
    "tumblr",
    {
      "provider": "facebook",
      "app_id": "254325784911610"
    }
  ],
  "components": [
    {
      "type": "heading",
      "text": "Introduction"
    },
    {
      "type": "small",
      "title": "AMP Story Hello World",
      "url": "/documentation/examples/introduction/stories_in_amp",
      "image": "/favicons/android-chrome-256x256.png"
    },
    {
      "type": "heading",
      "text": "Features"
    },
    {
      "type": "small",
      "title": "Animations",
      "url": "/documentation/examples/visual-effects/amp_story_animations",
      "image": "/favicons/android-chrome-256x256.png"
    },
    {
      "type": "small",
      "title": "Layouts",
      "url": "/documentation/examples/style-layout/amp_story_layouts",
      "image": "/favicons/android-chrome-256x256.png"
    },
    {
      "type": "small",
      "title": "Media",
      "url": "/stories/features/media/",
      "image": "/favicons/android-chrome-256x256.png"
    },
    {
      "type": "small",
      "title": "Supporting desktop and landscape mode",
      "url": "/documentation/examples/style-layout/desktop_and_landscape_mode_support",
      "image": "/favicons/android-chrome-256x256.png"
    },
    {
      "type": "heading",
      "text": "Monetization"
    },
    {
      "type": "small",
      "title": "DoubleClick",
      "url": "/documentation/examples/advertising-analytics/doubleclick_amp_story_ads",
      "image": "/favicons/android-chrome-256x256.png"
    },
    {
      "type": "small",
      "title": "Publisher Served",
      "url": "/documentation/examples/advertising-analytics/publisher_served_amp_story_ads",
      "image": "/favicons/android-chrome-256x256.png"
    },
    {
      "type": "heading",
      "text": "Visual Effects"
    },
    {
      "type": "small",
      "title": "Ken Burns",
      "url": "/documentation/examples/visual-effects/ken_burns",
      "image": "/favicons/android-chrome-256x256.png"
    },
    {
      "type": "heading",
      "text": "User Consent"
    },
    {
      "type": "small",
      "title": "Story User Consent",
      "url": "/documentation/examples/user-consent/story_user_consent",
      "image": "/favicons/android-chrome-256x256.png"
    }
  ]
}
```

### poster-portrait-src

<https://amp.dev/static/samples/img/story_dog2_portrait.jpg>

If you open that url in Chrome and inspect it, Google shows the image with these sizes:

width="426"
height="569"

But that image looks a lot longer than that.

The [Google Docs say](https://developers.google.com/search/docs/advanced/appearance/web-stories-creation-best-practices):

*Make sure that the image linked to your <amp-story> poster-portrait-src attribute is at least 640x853px and use an aspect ratio of 3:4.*

Download the image and the properties show: 720 x 960.

The different posters sizes are and the original are:

```txt
story_dog2_portrait.jpg  720 x 960
story_dog2_square.jpg 720 x 720
story_dog2_landscape.jpg 720 x 541
story_dog2.jpg 720 x 1279
```

They are all the same image, but in different aspects.  The dog image obviously came from a hi res original, probably from a digital camera.  Our images will be quite a bit smaller, and I'm not sure how this will affect things.

But it appears like, as well as the thumbnails we have been meaning to create, we will need to create separate files for these aspects as well.  That's five images for each artwork people.  AWS is going to love that!

To accomplish this, one way would be to use [ImageMagic](https://stackabuse.com/working-with-images-in-node-js-graphicsmagick-and-imagemagick/) which I have read about before.  It has a cli as well as an npm package that can be used from node which is where we will use it.

The good news is the image dimensions will become available:

```js
{
  Format: 'JPEG (Joint Photographic Experts Group JFIF format)',
  format: 'JPEG',
  Geometry: '213x133',
  size: { width: 213, height: 133 },
  Class: 'DirectClass',
  Type: 'true color',
  Depth: '8 bits-per-pixel component',
  ...
  Signature: 'ae5b5e492457ac667e9a4cb1e7b78b7e6459fbf342ea741857ee4e9e1092ad73',
  Tainted: 'False',
  path: 'sample_image.jpg'
}
```

One we have that info, something like this will work to crop the image to the wanted size:

```js
const gm = require('gm');

// Crop image to 100x100 at position 20, 20
gm("sample_image.jpg")
    .crop(100, 100, 20, 20)
    .write('resized_img_crop.jpg', function (err, value) {
        if(err) console.log(err);
        console.log(value);
    });
```

## Ads

<https://support.google.com/adsense/answer/10175505?hl=en>

## Content suggestions

No more that 280 characters on a story page.

Use a scrim layer/filer to increase text contrast.
Use a text box background.
Use a full width shape such as a band.

Keep text is safe zone.
