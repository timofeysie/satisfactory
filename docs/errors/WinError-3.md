# [WinError 3]

The BART worked and created a summary, but no images were generated by the GAN.

Using the test api also fails to generate images:

http://localhost:3333/api/gan

Running the script directly shows:

python test.py --style Hosoda --gpu 0

```txt
PS C:\Users\timof\repos\timofeysie\satisfactory\apps\toonify\src> python test.py --style Hosoda --gpu 0 
Traceback (most recent call last):
  File "C:\Users\timof\repos\timofeysie\satisfactory\apps\toonify\src\test.py", line 23, in <module>
    if not os.path.exists(opt.output_dir): os.mkdir(opt.output_dir)
FileNotFoundError: [WinError 3] The system cannot find the path specified: 'apps/toonify/src/cartooned_img/'
```

OK, that's weird.  Given its a new error and that the script has been working a recently as this morning, it seems like nothing should have changed.

apps\toonify\src\cartooned_img
apps/toonify/src/cartooned_img

Just the slash is different.

But come to think of it, the modal to switch the python version did come up a few times instead of the format document option in VSCode.  I do that quickly so possibly I changed that, and now can't change it back?

I think I had chosen a 32-bit option which SO shows as a reason for that error.  But switching back to 64-bit doesn't seem to help.

Python 3.9.6 64-bit

That's what the interpreter says.

Trying the full path:

parser.add_argument('--output_dir', default='C:\\Users\\timof\\repos\\timofeysie\\satisfactory\\apps\\toonify\\src\\cartooned_img')

```txt
PS C:\Users\timof\repos\timofeysie\satisfactory\apps\toonify\src> python test.py --style Hosoda --gpu 0
Traceback (most recent call last):
  File "C:\Users\timof\repos\timofeysie\satisfactory\apps\toonify\src\test.py", line 27, in <module>
    model.load_state_dict(torch.load(os.path.join(opt.model_path, opt.style + '_net_G_float.pth')))
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\torch\serialization.py", line 594, in load
    with _open_file_like(f, 'rb') as opened_file:
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\torch\serialization.py", line 230, in _open_file_like
    return _open_file(name_or_buffer, mode)
  File "C:\Users\timof\AppData\Local\Programs\Python\Python39\lib\site-packages\torch\serialization.py", line 211, in __init__
    super(_open_file, self).__init__(open(name, mode))
FileNotFoundError: [Errno 2] No such file or directory: 'apps/toonify/src/pretrained_model/Hosoda_net_G_float.pth'
```

Again with the file not found.

But that did change, so changing the path to an absolute one worked.  

```txt
parser.add_argument(
 '--input_dir', default='C:\\Users\\timof\\repos\\timofeysie\\satisfactory\\apps\\toonify\\src\\test_img')
parser.add_argument('--load_size', default = 450)
parser.add_argument(
 '--model_path', default='C:\\Users\\timof\\repos\\timofeysie\\satisfactory\\apps\\toonify\\src\\pretrained_model')
parser.add_argument('--style', default = 'Hosoda')
parser.add_argument('--output_dir', default='C:\\Users\\timof\\repos\\timofeysie\\satisfactory\\apps\\toonify\\src\\cartooned_img')
parser.add_argument('--gpu', type=int, default = 0)
```

But then we still end up getting another one:

FileNotFoundError: [Errno 2] No such file or directory: 'C:\\Users\\timof\\repos\\timofeysie\\satisfactory\\apps\\toonify\\src\\cartooned_img\\Darwin_Olympic_player_Josh_Horvat_%28right%29_and_Dion_Bandiera_from_Alice_Springs_club_Celtic_during_the_Northern_Territory_final_in_the_FFA_Cup_at_the_Darwin_Football_Stadium_Hosoda.jpg'

Strange, if I delete the cartooned_img
 directory, the script will recreate it as it should.

The brute force method may be to specify the paths in the call:

python test.py --input_dir YourImgDir --style {Hosoda/Hayao/Paprika/Shinkai} --gpu 0

python test.py --input_dir C:\\Users\\timof\\repos\\timofeysie\\satisfactory\\apps\\toonify\\src\\test_img --style {Hosoda/Hayao/Paprika/Shinkai} --gpu 0

However, we still see the error:

FileNotFoundError: [WinError 3] The system cannot find the path specified: 'apps/toonify/src/cartooned_img/'

I tried adding this to the test.py to confirm the directory being used:

```py
path = r'C:\\Users\\timof\\repos\\timofeysie\\satisfactory\\apps\\toonify\\src'
directory = os.getcwd()
print("Current working directory %s" % directory)
os.chdir(path)
directory = os.getcwd()
print("Directory changed success %s" % directory)
```

Still, get the error.

Then, the next time I start the NestJS backend and Angular frontend, the products API fails with a similar error:

```txt
[Nest] 8800   - 06/02/2022, 12:44:34 pm   [ExceptionsHandler] ProductsService.findAll: no files Error: ENOENT: no such file or directory, scandir 'C:\Users\timof\repos\timofeysie\satisfactory\apps\toonify\src\posts' +3992ms
```

For that we see [this advice](https://stackoverflow.com/questions/45251645/error-enoent-no-such-file-or-directory-scandir)

```txt
npm rebuild node-sass
or
rm -rf node_modules && npm install
or
npm rebuild
...
semver@7.3.5 C:\Users\timof\repos\timofeysie\satisfactory\node_modules\@angular-devkit\build-angular\node_modules\semver
source-map@0.7.3 C:\Users\timof\repos\timofeysie\satisfactory\node_modules\@angular-devkit\build-angular\node_modules\source-map
terser-webpack-plugin@4.2.3 C:\Users\timof\repos\timofeysie\satisfactory\node_modules\@angular-devkit\build-angular\node_modules\terser-webpack-plugin
p-limit@3.1.0 C:\Users\timof\repos\timofeysie\satisfactory\node_modules\@angular-devkit\build-angular\node_modules\p-limit
schema-utils@3.0.0 C:\Users\timof\repos\timofeysie\satisfactory\node_modules\@angular-devkit\build-angular\node_modules\schema-utils
ajv@6.12.6 C:\Users\timof\repos\timofeysie\satisfactory\node_modules\@angular-devkit\build-angular\node_modules\ajv
json-schema-traverse@0.4.1 C:\Users\timof\repos\timofeysie\satisfactory\node_modules\@angular-devkit\build-angular\node_modules\json-schema-traverse
source-map@0.6.1 C:\Users\timof\repos\timofeysie\satisfactory\node_modules\@angular-devkit\build-angular\node_modules\terser-webpack-plugin\node_modules\source-map
```

In the products.controller, there is an error on the import

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

Cannot find module '@nestjs/common' or its corresponding type declarations.ts(2307)

What gives?  The products were working last night.  The whole app is deteriorating.

As well the same in the products.service, on this line

import * as fs from 'fs';

It says:

This syntax requires an imported helper but module 'tslib' cannot be found.ts(2354)

I restart VSCode and those errors go away.  Still, that's weird about the file not found errors.  Now products are working again, but the GAN is still not.

I note that the download is working to save the file in the test_image directory.

In another test, I changed the file name from:

Darwin_Olympic_player_Josh_Horvat_%28right%29_and_Dion_Bandiera_from_Alice_Springs_club_Celtic_during_the_Northern_Territory_final_in_the_FFA_Cup_at_the_Darwin_Football_Stadium_Shinkai.jpg

FileNotFoundError: [Errno 2] No such file or directory: 'C:\\Users\\timof\\repos\\timofeysie\\satisfactory\\apps\\toonify\\src\\cartooned_img\\Darwin_Olympic_player_Josh_Horvat_%28right%29_and_Dion_Bandiera_from_Alice_Springs_club_Celtic_during_the_Northern_Territory_final_in_the_FFA_Cup_at_the_Darwin_Football_Stadium_Shinkai.jpg'

to abc.jpg, and the image is generated.

So it's most likely a file name thing.  I think we have a growing collection now if images that have generation problems.  This needs to be looked at and fix or a workaround discovered.

Stay tuned.
