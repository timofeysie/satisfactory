# Generate offsets

These are used to create posters.  To decide where to crop an image for a portrait or landscape view needs some decision making about what to focus on in the image.

There are various way this could happen.

1. center the crop by dividing the excess space
2. find the face in the image and center on that
3. let the user enter the offsets with inputs
4. let the user drag the image around to center where they want it
5. also allow zooming in and out

The first two can be automated, and indeed, #1 is how it's currently done.  See the existing image-preview.component for how that is done.

Method 2 would be nice, but not every image has only one individual in it.

Method 3 is a simplistic approach that can be used to get on with this.

Method four I don't understand how would work at the moment.

Method five seems like a great idea.  That also could be done manually with a slider or something.  With large files this is essential.  They need to be resized otherwise the posters will be meaningless swatches or a much larger image.

However, is it possible that for one poster, we want to zoom out, and another, a zoom in?  In this case, there needs to be that zoom setting for each aspect as well.

Wow, this feature is already over a month, and there is still no end in sight.

## Method 3 with sliders

We need the range of available options.  This only includes the left possible offset, and the top possible offset.

Let get an example to work with.

fileName: Rybakina_RG19_%284%29_%2848199109407%29.jpg

original: { width: 690, height: 956 },

  maxPortraitHeight = 960;
  maxLandscapeHeight = 541;

### New display component

nx g @nrwl/angular:component components/image-previews -project=products
