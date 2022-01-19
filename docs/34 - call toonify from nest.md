# Call Toonify from Nest

## Todo

1. create a new app to hold Toonify
2. copy the code there
3. create a new api to work with the images
4. send url to server
5. download images
6. run all models on the image
7. alert the front end that the images are ready
8. frontend displays the images and user selects one
9. upload image selected to an S3 bucket
10. allow the user to choose between the images
11. add the selected image link to the post

This ought to about cover it.  No. 7 and no. 8 are bigger than the rest.

No. 7 will require using a service worker and a new framework to support push notifications.

No. 8 will require an AWS account to support using S3 CRUD functions.  It's pretty standard so shouldn't be too difficult.

### Estimates

```txt
1-5, one week
6 one week
7 one week
8-9 five days
```

So, basically a month.  I had a feeling this would be quicker.  The S3 bucket is not technically necessary at this point, but needs to happen sooner or later.

Anyhow, this is pretty much the core of the app, so one month is understandable.

## 1. create a new app to hold Toonify & 2

nx g @nx-python/nx-python:app toonify

Then copy the whole toonify code to the src directory.

## 3. create a new api to work with the images & 4

nx generate @nestjs/schematics:resource gan --sourceRoot apps/nest-demo/src/app

Getting the url to the backend required some extra work to extract the image path and create the link to the full sized image to download.

## 5. Download images

This is how it will work for a single image.

```js
  downloadImage(links: any) {
    console.log('links', links[0]);
    // return 'This action downloads an image for the gan '+links[0];
    return new Promise((resolve, reject) => {
        https.get(links[0], (res) => {
            if (res.statusCode === 200) {
              const filepath = 'apps/toonify/src/test.jpg';
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
  }
```

Not sure about an array of multiple links yet.  Probably we need a promise factory to create a new promise for each link and do promises.all() on them.  That can be done later.

Right now it appears like the frontend is not done with getting appropriate image links.

links https://upload.wikimedia.org/wikipedia/commons/1/1d/Chuck_Liddell_vs._Ri

That would be for this commons page.

The full res version is:
https://upload.wikimedia.org/wikipedia/commons/1/1d/Chuck_Liddell_vs._Rich_Franklin_UFC_115.jpg

## 6. Call Toonify

Test the app like this:

python apps/toonify/src/test.py  --style Hosoda --gpu 0

FileNotFoundError: [Errno 2] No such file or directory: './apps/toonify/src/test_img\\Theranos_Chairman,_CEO_and_Founder_Elizabeth_Holmes_(L)_and_TechCrunch_Writer_and_Moderator_Jonathan_Shieber_speak_onstage_at_TechCrunch_Disrupt_at_Pier_48_on_September_8,_2014_(14995888227).jpg'

There was a problem with the paths in test.py, and also that file name.  Doing this and shortening the filename works:

parser.add_argument('--input_dir', default = 'apps/toonify/src/test_img/')

python apps/toonify/src/test.py  --style Hosoda --gpu 0

However, we called from the Nest gan api: http://localhost:3333/api/gan

I get this error:

```txt
[Nest] 8948   - 09/01/2022, 2:39:30 pm   [ExceptionsHandler] C:\Users\timof\repos\timofeysie\satisfactory\apps\toonify\src\test.py:63: UserWarning: volatile was removed and now has no effect. Use `with torch.no_grad():` instead.
  input_image = Variable(input_image, volatile=True).float()
```

Line 63: input_image = Variable(input_image, volatile=True).float()

I'm not really sure how to apply that suggestion, so I just removed the volatile=True, but then there is another error:

```txt
[Nest] 8948   - 09/01/2022, 2:44:20 pm   [ExceptionsHandler] C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\torch\nn\functional.py:1794: UserWarning: nn.functional.tanh is deprecated. Use torch.tanh instead.
  warnings.warn("nn.functional.tanh is deprecated. Use torch.tanh instead.")
```

This is not even part of the project, so not sure how to proceed.  

### Steps to reproduce & project brief

Run the node server: nx serve nest-demo

Go to this url when it's running: http://localhost:3333/api/gan

See this error:

```txt
[Nest] 8948   - 09/01/2022, 2:39:30 pm   [ExceptionsHandler] C:\Users\timof\repos\timofeysie\satisfactory\apps\toonify\src\test.py:63: UserWarning: volatile was removed and now has no effect. Use `with torch.no_grad():` instead.
  input_image = Variable(input_image, volatile=True).float()
```

The Node API service that makes the call to the Python app can be seen here: apps\nest-demo\src\app\gan\gan.service.ts

The process = spawn('python', ...) approach has been used somewhat successfully in the hugging-face text extraction and summarizer app.

See the apps\nest-demo\src\app\bart\bart.service.ts which handles calling the apps/hugging-face/src/goose.py script as a working example.

Due to the time taken, the result must be loaded by the front end when it's ready.

Note also that calling test.py directly from the command line works to generate an image.

I currently haver Python 3.9.6 64-bit via VS Code.  There are no current plans to deploy this app to a server, having the apps running locally in VS Code is fine for now.

The hugging-face and other Python apps with rely on libraries like pymatting will also need to work and share the same version of Python that all the other apps use as this is a nx monorepo.

## 4. send url to server and download image

The api/gan post can be used for this.

Once the backend gets the url, it can save the image in preparation for calling cartoonify to process it.
