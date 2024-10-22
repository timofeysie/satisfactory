# Ruffmello

This can be seen as phase four of this project.

Phase one was the enterprise Angular with NgRx and Nx.

Phase two was the using this app to create a trend factory using AI images

Phase three was using the generated list to create a Preact site deployed Netlify.

Phase four is taking parts of the above and using them in a React frontend/Django backend to generate the list for the Ruffmello site.

## The data model

### The current model used by ruffmello.com

This is implemented in the Next.js Preact Static Site Generator (SSG) called [Aegeus](https://github.com/timofeysie/aegeus).

There is a larger amount of data generated for each post than is used in the SSG posts called illustrations.

```js
export default function IllustrationCard({
  url,
  title,
  altText,
  category,
  date,
  keywords,
  imageDescription,
  imageMetaDescription,
  imageSource,
  width,
  height,
  snippet,
  imageUrl,
  linkUrl,
  linkLabel,
  newsLink,
  newsLinkLabel,
}) { ...
```

This is pretty good, but I feel like the two types or links could be handled better.

I want to consider using an array of links with a type.

The linkUrl is for Wikipedia content, and the newsLink is for AP news.

I think it is useful to have specific types of links.

But we also want to allow arbitrary links.

There are actually two more properties that appear unused:

- linkForSummary
- useAPNewsLink

These look important, but if they are not used, they should not be needed.  Possibly I have been considering this change for a while and this is an indication of that.

Given that this project is about five years old now, if not older, the goal of this document at first is just to gather the details I need to plan the next phase.

Phase four might use the same name as phase three which is currently deployed as [ruffmello.com](https://ruffmello.com).

However, this may change.  Probably this should be called the Django phase, as the work will be to add a new type of trend post API to the [DRF-Two](https://github.com/timofeysie/drf-two) backend.  This will be consumed by the (currently named) [.One](https://github.com/timofeysie/dot-one) React frontend.

The frontend will act as the new trend factory, or a kind of content management system for generating rich posts for images.

Since it is deployed with auth, the API can be used by Aegus during SSG to generate the list of posts as well as the post details which is then deployed to Netlify.

There will be other APIs required for the post creation, such as getting the list of trending searches.

Previously, the trend factory used a list of daily trends.  This is pretty much after the fact.  What we want is to predict trends that are happening in real time which will go on to appear on the list of daily trends.  The concept of the mashup is still relevant where we want to combine two or more trends.  Previously the trend factory was hard-wired to use one or two trends which was a mistake from the beginning.  So one of the goals of this project is to re-imagine the trend factory to be more open and designed to be deployed and used on a mobile device instead of being stuck on a laptop running the various parts of the app to do its work.

Another goal is to document the original form of the trend factory in the README.  Given the rise of ML and AI, it can be seen as an early adopter of the technology.  Now, as a 10x developer, using AI tools to develop this grand idea makes it more reasonable and achievable.
