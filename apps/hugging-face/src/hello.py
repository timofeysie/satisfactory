from transformers import pipeline
class HelloFactory:
    def __init__(self, **args):
        for key, value in args.items():
            setattr(self, key, 'Start {}'.format(value))

if __name__ == '__main__':
    hello = HelloFactory(application="hugging-face", user="Human")
    print(hello.application)

import cv2, os, sys
import trimap

path = "apps/hugging-face/src/Alfonzo_McKinnie.jpg"
image   = open(path, 'r')
name    = "testImage"
size    = 10; # how many pixel extension do you want to dilate
number  = 1;  # numbering purpose 
trimap(image, name, size, number, erosion=False)

from pymatting import cutout

# cutout(
#    # input image path
#    "apps/hugging-face/src/Alfonzo_McKinnie.jpg",
#    # input trimap path
#    "apps/hugging-face/src/Alfonzo_McKinnie_tri1.png",
#    # output cutout path
#    "apps/hugging-face/src/Alfonzo_McKinnie.png")
