# SEO

- Meta description length: a minimum of 100 characters is recommended

```js
    this.meta.addTags([
      { name: 'description', content: this.trend.description },
      { name: 'author', content: this.trend.author },
      { name: 'keywords', content: this.trend.keywords },
      { name: 'twitter:card', content: this.trend.pageTitle },
      { name: 'og:url', content: '/' },
      { name: 'og:title', content: this.trend.pageTitle },
      { name: 'og:description', content: this.trend.description },
      { name: 'og:image', content: this.trend.two.imageSrc },
    ]);
```

Meta keywords are deprecated by most search engines.

## The meta description

It's *a snippet of up to about 155 characters which summarizes a page’s content. Search engines show it in search results mostly when the searched-for phrase is within the description.*

Sometimes Google it decides to show the meta description, and sometimes it just grabs some sentences of your copy. Either

Length should be from 120 to 156 characters.

We use the description.  Should they be the same thing?

### Use active voice and make it actionable

"Get motivated to design the home of your dreams with our inspiring looks and practical decorating tips".

### Include a call-to-action

“Hello, we have such and such new product, and you want it. Find out more!”

The meta description is your sales text. Except, in this case, the “product” you are trying to sell is the page that is linked. Invitations like Learn more, Get it now, Try for free come in handy and we use them too.

### Use your focus keyword

If the search keyword matches a part of the text in the meta description, Google will be more inclined to use it and highlight it in the search results.

### What is a rich snippet?

A snippet is a result Google shows to the user in the search results.   Rich results as they are now called.

A picture is added, you can see the rating stars.

Google can show rich results or snippets if you add structured data.

[Source](https://yoast.com/meta-descriptions/#characteristics).

### One or three?

Do we need one meta description from the whole piece, and one for each picture, or just one for the whole topic?

I'm trending towards three, as we might want to offer a single image and description by itself at some point.

Then, what do we do about the main topic meta description?

Should if be a combination of the two?  No, too long.

So then it's three original meta-descriptions.

The could be pre-filled using the description via a button.

The picture meta description tags will not be used on the main page, but on their individual pages, when they have one, including a link to that page.  Currently this is just a detail view, but will need to be it's own route.
