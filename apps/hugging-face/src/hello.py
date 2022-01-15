from transformers import pipeline
class HelloFactory:
    def __init__(self, **args):
        for key, value in args.items():
            setattr(self, key, 'Start {}'.format(value))

if __name__ == '__main__':
    hello = HelloFactory(application="hugging-face", user="Human")
    print(hello.application)

<<<<<<< HEAD
# Open and read the article
f = open("apps/hugging-face/src/article.txt", "r", encoding="utf8")
to_tokenize = f.read()

# Initialize the HuggingFace summarization pipeline
summarizer = pipeline("summarization")
summarized = summarizer(to_tokenize, min_length=75, max_length=300)

# Print summarized text
print(summarized)
=======
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
>>>>>>> HuggingFace
