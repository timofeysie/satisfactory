# Image SEO

## Image captions & descriptions

Used to extract information to then try to understand the image.

Captions should:

1. helps to understand the content of the image;
2. includes the keyword that you want to rank;
3. complements the content of the article.

Then what is the difference in HTML  between an image caption and description?

```html
<figure>
  <img src="pic_trulli.jpg" alt="Trulli" style="width:100%">
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>
```

Do we need a separate description?

```html
<figure class="w-full wrapper-16-9 relative">
    <picture data-testid="picture">
      <source srcset="https://imgresizer.....jpg"
        type="image/webp"
        media="(max-width: 699/1023/1024/699/1023/1024px)" />
      <img
        class="text-transparent inside-16-9"
        src="https://imgresizer...-1440.jpg"
        alt="Angel Correa of Atletico ..."
    /></picture>
</figure>
<figcaption class="ArticleHeroBlack__caption--light">
  <p>Angel Correa of Atletico ...</p>
</figcaption>
```

## alt text

Serves to describe the content of the image for screen readers to understand the content, and is displayed when the user’s browser cannot load the image file for some reason.

## Aspect

Google tends to favor rectangular images, in proportions like 16:9 or 4:3.

This makes dimensions like 1366 x 768 (16:9) or 720 x 480 (4:3) rank better than images totally out of pattern (like something very horizontal or very vertical).

If these dimensions seem familiar to you, it’s because they are: 16:9 and 4:3 formats are usually used in video resolutions such as TVs, movies, and on YouTube itself.

## Image size

Free tools to compress and reduce image’s file size:

- Optimizilla;
- Kraken.io;
- TinyPNG;
- JPEGmini;
- jpeg.io;
- ImageOptim.

remove the metadata from the file;

## Create embedding links

Facilitate and encourage the embedding of these media in other pages to improve their ranking in Google Images.

## Create an image sitemap

create an image sitemap to facilitate the crawler’s work of finding your media files and, of course, ensure a better ranking for your site.
