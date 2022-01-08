# Call Toonify from Nest

## Todo

1. create a new app to hold Toonify
2. copy the code there
3. create a new api to work with the images
4. send url to server and download image
5. run all models on the image
6. alert the front end that the images are ready
7. upload images to an S3 bucket
8. allow the user to choose between the images
9. add the selected image link to the post

This ought to about cover it.  No. 6 and no. 7 are biggies.

No. 6 will require using a service worker and a new framework to support that.
No. 7 will require another whole new skill of using S3.  It's pretty standard so shouldn't be too difficult.

### Estimates

```txt
1-5, one week
6 one week
7 one week
8-9 five days
```

So, basically a month.  I had a feeling this would be quicker.  The S3 bucket is not technically necessary at this point, but needs to happen sooner or later.

Anyhow, this is pretty much the core of the app, so one month is understandable.

## 1. create a new app to hold Toonify

nx generate @nestjs/schematics:resource toonify --sourceRoot apps/nest-demo/src/app
