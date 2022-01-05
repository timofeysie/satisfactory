# Twitter Cards

Set up the meta tags of the images for social networks not only through Facebook Open Graph, but Twitter Cards.

Set the twitter:card meta tag.

<meta name="twitter:card" content="summary_large_image" />

The Toys Matrix Sound of music post contains the following twitter card meta data attributes:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://cdn../36/750x445/1543466.jpg" />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Eli Pacheco" />
<meta name="twitter:label2" content="Est. reading time" />
<meta name="twitter:data2" content="1 minute" />
```

The MyLondon sound of music twitter cards:

```html
    <meta name="twitter:card" value="summary_large_image" />
    <meta name="twitter:site" value="@myldn" />
    <meta name="twitter:creator" value="@johnjames1557" />
    <meta
      name="twitter:image"
      value="https://i2-prod.chroniclelive.co.uk/incoming/article19781862.ece/ALTERNATES/s1200/0_FILE-Actor-Christopher-Plummer-Dies-at-91.jpg"
    />
```

The Sound of music post on Express.co.uk:

```html
<meta property="twitter:card" content="summary_large_image" />
    <meta
      property="twitter:image:src"
      content="https://cdn...1543506.jpg"/>
    <meta
      property="twitter:title"
      content="Sound of Music: The devastatingly cruel accident that destroyed Julie Andrews' voice"
    />
    <meta
      property="twitter:description"
      content="JULIE ANDREWS had one of the greatest voices in Hollywood history in movies from The Sound of Music to Victor Victoria - until it was taken from her. The brave star battled through four operations and depression. Watch the incredible moment, decades later, when she tried to sing again in public."
    />
```

Put all those together and we get this:

```js
twitter:card" content="summary_large_image" />
twitter:image" content="https://cdn../36/750x445/1543466.jpg" />
twitter:image:src" content="https://cdn...1543506.jpg"/>
twitter:label1" content="Written by" />
twitter:data1" content="Eli Pacheco" />
twitter:label2" content="Est. reading time" />
twitter:data2" content="1 minute" />
twitter:site" value="@myldn" />
twitter:creator" value="@johnjames1557" />
twitter:title" content="Sound of Music: The devastatingly cruel accident that..."
twitter:description content="JULIE ANDREWS had one of the greatest voices..."
```

## Twitter Card Validator

Get debugging information about how the twitter card will work with this app.
