# Stories

The plan here is to bypass the hard part of using JavaScript and some kind of SSR to convert the JSON data into AMP stories, we will create our own simple template and generate the pages which can be used directly by a Preact built Next.js site deployed via Vercel.

Here are the notes from the preact bundle test project which will be used to this.

## Anatomy of a story

The demo code has a comment which status:

*A story consists of one or more pages. Each page is declared by an `amp-story-page` element.*

*Pages are designed by layering videos, images and text. Here we have a page that uses two layers.*

*One layer filling the available space with an image and one text layer that shows a heading.*

Further pages have example content such as:

- A video which auto-plays and loops.
- Pre-defined entry animations make it possible to create dynamic pages without videos.
- Stories can use predefined layouts to style the page.
- A "bookend" panel containing links to other resources can appear on the last page.

### Pre-defined entry animations

The length and initial delay can be customized using the `animate-in-duration` and `animate-in-delay` properties.
The [animations sample](/documentation/examples/visual-effects/amp_story_animations/) shows all available animations in action.

### Predefined layouts to style the page

Stories can use predefined layouts to style the page.

Here we're using the `thirds` template. For an overview about the available layouts take a look at the [layouts sample](/documentation/examples/style-layout/amp_story_layouts/)

### A "bookend" panel

A "bookend" panel containing links to other resources will appear on the last page of your story if you include an `amp-story-bookend` that references a [bookend JSON config](/static/samples/json/bookend.json)

### HTML structure

Some attributes such as height and width were removed for brevity.

```html
<Head>
  <title>Example AMP Story in Next.js</title>
  <script key="amp-story"/>
</Head>
<amp-story
  standalone=""
  title="Stories in AMP - Hello World"
  publisher="AMP Project"
  publisher-logo-src="https://amp.dev/favicons/coast-228x228.png"
  poster-portrait-src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg"
  poster-square-src="https://amp.dev/static/samples/img/story_dog2_square.jpg"
  poster-landscape-src="https://amp.dev/static/samples/img/story_dog2_landscape.jpg"
>
  <amp-story-page id="page-1">
    <amp-story-grid-layer template="fill">
      <amp-img src="story_dog2.jpg" />
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical">
      <h1>Hello World</h1>
      <p>This is an AMP Story.</p>
    </amp-story-grid-layer>
  </amp-story-page>

  {/* <!-- Pre-defined entry animations --> */}
  <amp-story-page id="animation-demo">
    <amp-story-grid-layer template="fill">
      <amp-img src="story_dog4.jpg"/>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="thirds">
      <h2
        animate-in="fly-in-bottom"
        grid-area="lower-third"
        animate-in-delay="0.4s"
      >
        Best walk ever!
      </h2>
    </amp-story-grid-layer>
  </amp-story-page>

  {/* <!-- predefined layouts to style the page --> */}
  <amp-story-page id="layout-demo">
    <amp-story-grid-layer template="thirds">
      <amp-img grid-area="upper-third"
        src="story_thirds_1.jpg" />
      <amp-img grid-area="middle-third"
        src="story_thirds_2.jpg" />
      <amp-img grid-area="lower-third"
        src="story_thirds_3.jpg" />
    </amp-story-grid-layer>
  </amp-story-page>

  {/* <!-- A "bookend" panel --> */}
  <amp-story-bookend src="bookend.json"
  />
</amp-story>
```

## Create a Preact Story

From here: <https://github.com/vercel/next.js/tree/canary/examples/amp-story>

>npx create-next-app --example amp-story preact-amp-story

From here: <https://github.com/preactjs/next-plugin-preact>
npm install --save next next-plugin-preact preact react@npm:@preact/compat react-dom@npm:@preact/compat react-ssr-prepass@npm:preact-ssr-prepass preact-render-to-string

Although it's a "Next.js plugin for preact", so maybe I would have to create a Preact app first and then configure it as a Next.js one?  Sorry if I assumed it was the opposite at first.

## Using the demo story as a template

Do we need a new route for this?  

Or do it when the list is generated?

Or do it when the list is saved?

Or do it one at a time on each form submit?

I actually like the last one.  Then we would have an instant preview ready to go.

Then what route is that?
