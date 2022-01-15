# Image background removal and mashup

The idea is to identify images that should have the image background removed and then the foreground added to another image.

There will be a number of front end and backend steps involved with this as well as the Python scripts to accomplish the goal.

## Image matting

Common image and video editing and composition technique. Traditionally, convoluted neural networks are used to infer the alpha matte...

[Source](https://analyticsindiamag.com/a-beginners-guide-to-image-matting-in-python/)

There is no repo for this.

### The trimap

An image marked with scribbles are considered input in stroke-based algorithms and are used to extract the alpha matte. Strokes-based algorithms require less user interaction and operation than trimap-based algorithms.

Creating the trimap without user input is what is desired if possible.

This seems OK: https://github.com/lnugraha/trimap_generator 

But: ModuleNotFoundError: No module named 'trimap_module'.

Another article: https://learnopencv.com/image-matting-with-state-of-the-art-method-f-b-alpha-matting/ 

## Example

Here is an example of what I would expect to work based on the above sources:

apps\hugging-face\src\hello.py

```py
import cv2, os, sys
import trimap
from pymatting import cutout

path = "apps/hugging-face/src/Alfonzo_McKinnie.jpg"
image   = open(path, 'r')
name    = "apps/hugging-face/src/Alfonzo_McKinnie_tri1.png"
size    = 10; # how many pixel extension do you want to dilate
number  = 1;  # numbering purpose 
trimap(image, name, size, number, erosion=False)

cutout(
# input image path
"apps/hugging-face/src/Alfonzo_McKinnie.jpg",
# input trimap path
"apps/hugging-face/src/Alfonzo_McKinnie_tri1.png",
# output cutout path
"apps/hugging-face/src/Alfonzo_McKinnie.png")
```

However, there are various version problems such as:

```py
from trimap_module import trimap
```

This is the code shown in the [trimap_generator](https://github.com/lnugraha/trimap_generator) examples.

However, we are using Python 3.9.6 which is incompatible with this.
