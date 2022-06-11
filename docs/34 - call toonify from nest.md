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

This ought to about cover it. No. 7 and no. 8 are bigger than the rest.

No. 9 will require using a service worker and a new framework to support push notifications.

No. 11 will require an AWS account to support using S3 CRUD functions. It's pretty standard so shouldn't be too difficult.

### Estimates

```txt
1-5, one week
6 one week
7 one week
8-9 five days
```

So, basically a month. I had a feeling this would be quicker. The S3 bucket is not technically necessary at this point, but needs to happen sooner or later.

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

Not sure about an array of multiple links yet. Probably we need a promise factory to create a new promise for each link and do promises.all() on them. That can be done later.

Right now it appears like the frontend is not done with getting appropriate image links.

links https://upload.wikimedia.org/wikipedia/commons/1/1d/Chuck_Liddell_vs._Ri

That would be for this commons page.

The full res version is:
https://upload.wikimedia.org/wikipedia/commons/1/1d/Chuck_Liddell_vs._Rich_Franklin_UFC_115.jpg

## 6. Call Toonify

Test the app like this:

python apps/toonify/src/test.py --style Hosoda --gpu 0

FileNotFoundError: [Errno 2] No such file or directory: './apps/toonify/src/test*img\\Theranos_Chairman,\_CEO_and_Founder_Elizabeth_Holmes*(L)_and_TechCrunch_Writer_and_Moderator_Jonathan_Shieber_speak_onstage_at_TechCrunch_Disrupt_at_Pier_48_on_September_8,\_2014_(14995888227).jpg'

There was a problem with the paths in test.py, and also that file name. Doing this and shortening the filename works:

parser.add_argument('--input_dir', default = 'dist/apps/public/')

python apps/toonify/src/test.py --style Hosoda --gpu 0

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

I currently haver Python 3.9.6 64-bit via VS Code. There are no current plans to deploy this app to a server, having the apps running locally in VS Code is fine for now.

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

But we already use the setting in our nest app: app.enableCors();

I then used a different approach to the https lib.

```js
  @Post()
  async downloadImage(@Body() linkWrapper: any) {
    const name = this.parsePath(linkWrapper.links[0]);
    console.log('gan.controller: downloadImage', name);
    const writer = fs.createWriteStream('dist/apps/public/'+name.filename);
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

Since the Angular Http service wasn't working for us, Axios was used. That data piped above has this type:

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

There will be four of those with ids 1 - 4 which represent the four images we are generating.

Next we let the user choose one of the generated images and are allowed to get the filename of the chosen one, which is OK because we know which directory they get generated in.

So now we have skipped a few of the steps, and this is where we are at so far:

- #7. create api to return the local image links (not doing)
- #8. delete the original downloaded images
- #9. alert the front end that the images are ready (not doing)
- #10. frontend displays the images and user selects one (done)
- #11. upload image selected to an S3 bucket

Deleting the downloaded images ensures that they don't keep getting generated each time the form goes into post creation mode.

Then, it's time to upload the results which will require a new API endpoint to send the selected file name, upload the image, and return the bucket address which can be used to add to the form and display.

## #11 upload image selected to an S3 bucket

We may need the aws-sdk package from npm for this and the ACCESS_KEY and KEY_SECRET from aws.

Step 1: create a new user that has a restricted set of permissions. To do so, we need to open the Identity and Access Management (IAM) panel and create a user.

Step 2: get the Access key ID and Secret access key and add them to our .env file

Step 3: add it to our environment variables validation schema in AppModule

Wait, what? The article shows this in the AppModule in src/app.module.ts:

```js
ConfigModule.forRoot({
  validationSchema: Joi.object({
    POSTGRES_HOST: Joi.string().required(),
    ...
    AWS_REGION: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  })
}),
```

I suppose this is one of the downsides of jumping into the middle of a long series of tutorials - there is something that happened before that is relied on for the current step.

Of course, our friend didn't figure this out on his own.  The [official NestJS docs](https://docs.nestjs.com/techniques/configuration) show how:

npm i --save @nestjs/config

Nest provides the @nestjs/config package out-of-the box that exposes a ConfigService which loads the appropriate .env file.

Step 5: Next we need the aws cdk:

npm install aws-sdk @types/aws-sdk

Step 6: open the [Amazon S3 panel](https://console.aws.amazon.com/s3/home?region=us-east-1) and create a bucket.

Step 7: create a service that uploads files to the bucket with a unique Id using the uuid library,

The example calls for a service with a constructor in the service.  I thought that was a no-no.  Or at least, we couldn't get it to work.

```js
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
  }
```

The article is also concerned with a db which we are not.

The controller looks like this:

```js
@UseInterceptors(FileInterceptor('file'))
async addAvatar(
  @Req() request: RequestWithUser, 
  @UploadedFile() file: Express.Multer.File) {
  return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
}
```

See the file buffer being used?  So we will have to load the file first in the controller.

I think at this point we should give the article a break and look at just a controller and service example of for example, [StackOverflow](https://stackoverflow.com/questions/61402054/nestjs-how-to-upload-image-to-aws-s3).

Then we get this error:

err TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be of type string or an instance of Buffer. Received an instance of ArrayBuffer

Try this: JSON.stringify(file);

Success!

Here are some of the details.

```txt
S3 URI: s3://one-public-bucket/Diego_Verdaguer_Hayao.jpg
Amazon Resource Name (ARN) arn:aws:s3:::one-public-bucket/Diego_Verdaguer_Hayao.jpg
Entity tag (Etag): 99914b932bd37a50b983c5e7c90ae93b
Object URL: https://one-public-bucket.s3.ap-southeast-2.amazonaws.com/Diego_Verdaguer_Hayao.jpg
```

So that's nice to see our first upload work.  But the response from the url is:

This XML file does not appear to have any style information associated with it. The document tree is shown below.

```xml
<Error>
<script id="tinyhippos-injected"/>
<Code>AccessDenied</Code>
<Message>Access Denied</Message>
<RequestId>3KM2RCY0Q9BXMXAQ</RequestId>
<HostId>UEHZ8BCDPDpftaf4EbBE6UWno7H/mZQPFq81e90CQFU0ZTzVB118TzursFualmQK0dmcWVATeoc=</HostId>
</Error>
```

That doesn't seem right.  The bucket is supposed to be public.

Also, the trends.component gets result: null.

## S3 Access

When trying to use links to the uploaded images such as this:

<https://one-public-bucket.s3.ap-southeast-2.amazonaws.com/Session_with_Bungie_at_PAX_2009_(3983322185)_Hayao.jpg>

We get a 404 errors.  I thought the bucket was set as public when created?  The bucket settings say:

Block all public access: Off

In the control panel:

<https://console.aws.amazon.com/s3/buckets/one-public-bucket?region=ap-southeast-2&tab=objects>

There are options such as:

```txt
Access Point policy - optional
Policy examples
The Access Point policy, written in JSON, provides access to the objects stored in the bucket from this Access Point. Access Point policies don't apply to objects owned by other accounts. Learn more
```

On the permissions tab the edit button is disabled in the Access control list (ACL) section.

The docs are too boring and long winded to worry about.

This Stackoverflow [has an answer](https://stackoverflow.com/questions/6975693/amazon-s3-access-image-by-url#:~:text=On%20your%20console%2C%20right%20click,Link%20from%20the%20Extended%20view.).

We don't want to manually have to allow access to the uploads anyhow.  This has to be all automated, so even if I find a way to do it for one image, I need to make the settings on the whole bucket permissive.

The default Bucket policy looks like this:

```json
 "Statement": [
  {
   "Sid": "Statement1",
   "Principal": {},
   "Effect": "Allow",
   "Action": [],
   "Resource": []
  }
```

I cam up with this:

```json
 "Statement": [
  {
   "Sid": "PublicRead",
    "Effect": "Allow",
    "Principal": "*",
    "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
    ],
   "Resource": "arn:aws:s3:::one-public-bucket/*"
  }
 ]
```

The last part was difficult to work out.  There was always an error until I read [this SO](https://stackoverflow.com/questions/44228422/s3-bucket-action-doesnt-apply-to-any-resources)

But with the above step done, I still see this when trying to go to an image url:

Status Code: 404 Not Found

The link in the browser however will download the image.

Oh, nevermind.  I wasn't interpolating the link.  ALl good now.

## Unused images

```txt
Blake_Powell_2014_Shinkai.jpg
AFC_Asian_Cup_Old_trophy_Hayao.jpg
Huntingdale_Railway_Station_Paprika.jpg
Joe_Burrow_(50677810636)_Hayao.jpg
Maddie_Ziegler_May_2015_(cropped)_Hayao.jpg
Pierre-Emerick_Aubameyang_Paprika.jpg
Scott_Morrison_Hosoda.jpg
```

,
    "s3": {
      "Location": ""
    }

## Error Handling

### The form submit post

The post form shows this error in the console:

HttpErrorResponse {headers: HttpHeaders, status: 201, statusText: 'Created', url: 'http://localhost:3333/api/trends/', ok: false, …}
error: {error: SyntaxError: Unexpected token T in JSON at position 0 at JSON.parse (<anonymous>) at XMLHtt…, text: 'This action adds a new trend'}
headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
message: "Http failure during parsing for <http://localhost:3333/api/trends/>"
name: "HttpErrorResponse"
ok: false
status: 201
statusText: "Created"
url: "http://localhost:3333/api/trends/"
[[Prototype]]: HttpResponseBase

Seems like it shouldn't be an error, but that should be fixed.

The frontend does this to catch either response:

```ts
this.trendsService.postTrendTopic(formValue).subscribe(
  (result) => {
    console.log('Value Received ' + result);
    this.openSnackBar('form posted 1', 'close');
  },
  (err) => {
    console.log('Error caught at Subscriber ' + err);
    this.openSnackBar('form submitted', 'close');
  },
  () => console.log('Processing Complete.')
);
```

The backend needs to get it's act together and return success.

### The description is ready

After Goose scrapes the content, and Bart creates the summary, you will see this message in the node output:

bart.service.getArticleSummary: path ./apps/nest-demo/src/app/bart/summaries/https%3A%2F%2Fwww.dailymail.co.uk%2Ftvshowbiz%2Farticle-10506411%2FKylie-Minogue-splashes-8-million-four-bedroom-home-Melbourne.html.txt
bart.controller.findOne: got id <https://www.dailymail.co.uk/tvshowbiz/article-10506411/Kylie-Minogue-splashes-8-million-four-bedroom-home-Melbourne.html>
