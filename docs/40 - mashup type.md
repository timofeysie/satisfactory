# Mashup Type

Add the mashup option to the two image selection cards here:

libs\trends\src\lib\components\topic-form\topic-form\topic-form.component.ts

When the onTypeSelectionChange() is called, we can possibly create a tab for two images to be selected it.
Or we can add an thumbnail of the image selected in the card.  This sounds like a better way to reduce the ... what?  Forgot what I was saying.

When onSelectedCommonsImage() gets called, we can check the type.

For mashups, add the image to a thumbnail image on the card.

We still don't know the user will determine which image selected is for which picture.

Could show a toggle.

## Set both images

Currently we download two images after being set with a one/two toggle.

downloadImages <https://upload.wikimedia.org/wikipedia/commons/0/01/Dubai_Sports_City_Pak_vs_Aussies.jpg>
trends.component.ts:442

downloadImages <https://upload.wikimedia.org/wikipedia/commons/7/79/Pakistan_in_Asia_%28%2Bclaims%29.svg/203px-Pakistan_in_Asia_%28%2Bclaims%29.svg.png>

The 'two' imageUrl is set if the mashup steps are followed, and the "tags": "", and "source": "" are set.

## Adding pictures together

An [SO](https://stackoverflow.com/questions/8070708/merge-2-images-with-node-js) answer showed using this library from 2018:

<https://github.com/lovell/sharp>.

Clean API and all you need to merge two images together.

Example:

```js
sharp(path + 'example.jpg')
    .overlayWith(path + 'label.png', { gravity: sharp.gravity.southeast } )
    .toFile(path + 'output.png')
```

answered Jun 26, 2018 at 20:39 by Schmidko.

Sharp works well, however, overlayWith is deprecated and you instead need to use composite. See below:

sharp(path + 'example.jpg')
       .composite([{input: path + 'logo.png', gravity: 'southeast' }])
       .toFile(path + 'output.png');
If you would like to center the image being overlayed: gravity: 'centre'
