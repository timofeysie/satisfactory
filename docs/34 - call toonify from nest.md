# Call Toonify from Nest

## Todo

1. create a new app to hold Toonify
2. copy the code there
3. create a new api to work with the images
4. send url to server
5. download images
6. run all models on the image
7. create api to return the local image links
8. delete the original downloaded images
9. alert the front end that the images are ready
10. frontend displays the images and user selects one
11. upload image selected to an S3 bucket
12. allow the user to choose between the images
13. add the selected image link to the post

This ought to about cover it.  No. 7 and no. 8 are bigger than the rest.

No. 9 will require using a service worker and a new framework to support push notifications.

No. 11 will require an AWS account to support using S3 CRUD functions.  It's pretty standard so shouldn't be too difficult.

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

## 5. Download the image

 the url download is causing this error:

```txt
gan.controller: downloadImage
links https://upload.wikimedia.org/wikipedia/commons/6/65/1971_Chrysler_Valiant_%28VG%29_Regal_Safari_station_wagon_%282015-07-10%29_02.jpg
(node:11936) UnhandledPromiseRejectionWarning: Error: Request Failed With a Status Code: 403
    at ClientRequest.<anonymous> (C:\Users\timof\repos\timofeysie\satisfactory\dist\apps\nest-demo\webpack:\apps\nest-demo\src\app\gan\gan.service.ts:22:24)
```

The url works in the browser indicating that this is a cors issue.

But we already use the setting in our nest app:  app.enableCors();

I then used a different approach to the https lib.

```js
  @Post()
  async downloadImage(@Body() linkWrapper: any) {
    const name = this.parsePath(linkWrapper.links[0]);
    console.log('gan.controller: downloadImage', name);
    const writer = fs.createWriteStream('apps/toonify/src/test_img/'+name.filename);
    const response = await this.httpService.axiosRef({
      url: linkWrapper.links[0],
      method: 'GET',
      responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }
```

## 6. run all models on the image

This should happen after directly after the image(s) are downloaded.

There is a bit of a problem with this, as the result after the download is all done in the controller, not the service.

gan.controller.ts

```ts
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
```

Since the Angular Http service wasn't working for us, Axios was used.  That data piped above has this type:

```js
(property) AxiosResponse<any>.data: any
```

What if we do this?

```ts
writer.on('finish', this.ganService.kickOffGan(pathToImage));
```

Then we get this interesting TS error:

```txt
No overload matches this call.
  The last overload gave the following error.
    Argument of type 'void' is not assignable to parameter of type '(...args: any[]) => void'.ts(2769)
fs.d.ts(247, 9): The last overload is declared here.
```

The on function has this mouseover:  

(method) WriteStream.on(event: "close", listener: () => void): fs.WriteStream (+8 overloads)

This will compile:

writer.on('finish', () => this.ganService.kickOffGan());

That works, and I see this in the terminal:

```txt
(node:18184) UnhandledPromiseRejectionWarning: [object Uint8Array]
(Use `node --trace-warnings ...` to show where the warning was created)
(node:18184) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)        
(node:18184) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```
