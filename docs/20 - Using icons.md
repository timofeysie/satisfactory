# Using Icons

[Font Awesome](https://fontawesome.com/) is a standard icon library.

I missed it the first time.  But according to [Wikipedia, Font and Fort are the same project](https://en.wikipedia.org/wiki/Font_Awesome).

## Installing Fort Awesome

This is the npm version called [Using a Package Manager](https://fontawesome.com/v5.15/how-to-use/on-the-web/setup/using-package-managers).  But I think we need a specific [Angular version](https://github.com/FortAwesome/angular-fontawesome).  The version for Angular 11 is: 0.8, 0.9 for Angular 12.

```txt
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/angular-fontawesome@0.9
```

One problem is there are no free fa exact social network icons.  There was a generic thumbs up like and a hashtag used for Twitter in the meantime.

Other possible libs are:

```txt
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-brands-svg-icons
npm i --save fortawesome/free-regular-svg-icons
```

### Finding icons

How to use a font awesome icon.  Explore the icons [here](https://fontawesome.com/v6.0/icons?m=free&s=solid%2Cbrands).

Add FontAwesomeModule to imports in src/app/app.module.ts.  It wont work unless it is imported into the module where it is used.  For this use case, that is this file:

libs\products\src\lib\products.module.ts

## Using Font Awesome with Angular

The example will show something like this:

```html
<i class="fa-solid fa-hash-tag"></i>
```

For Angular, that second class will be used in camelCase, or pascalCase if you like.

Add the icon you want to use in the class:

```js
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
...
faHashtag = faHashtag;
```

Add the icon to the template:

```html
<fa-icon [icon]="faThumbsUp"></fa-icon>
```

Give it a size like this:

```css
fa-icon {
    font-size: medium;
}
```
