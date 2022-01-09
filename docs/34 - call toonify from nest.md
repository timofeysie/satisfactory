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

nx g @nx-python/nx-python:app toonify

### 3. create a new api to work with the images

nx generate @nestjs/schematics:resource gan --sourceRoot apps/nest-demo/src/app

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
