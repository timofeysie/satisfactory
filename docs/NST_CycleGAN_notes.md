# NST (Neural Style Transfer) and CycleGAN notes:
NST Pytorch pretrained models and training script have been added into the project. 

## NST Files
- apps/toonify/src/NST_train_single_image.py >> Run this file to train NST on a new style and input pair. At least 2000 epochs are recommended. 
- apps/toonify/src/stylization_script.py >> Run this file to tranfer input image into pretrained styles. There are 4 pretrained models are available in models/binaries folder.
- apps/toonify/src/training_script.py >> To train NST on new style. This will save the pretrained model which can be used to transfer images afterwards. 
- apps/toonify/src/utils/ >> This utils folder consists of scripts for download pretrained models from dropbox and other helper functions. 

## CycleGAN Files
- apps/toonify/src/test_image_cyclegan.py >> The script transforms an input image into other forms using pretrained model. It takes a single image as an input. 
- apps/toonify/src/cyclegan_pytorch/ >> This folder contains scripts of CycleGAN model and other helper functions. 
- apps/toonify/src/cezanne2photo/ >> This folder contains pretrained CycleGAN Cezanne style models. Please try with all 4 models but in my case only 4th worked well. 

## Acknowledgement 
The code and pretrained models were borrowed from the following sources with minimum changes.  
- https://github.com/Octaves0911/Neural_Style_Transfer 
- https://github.com/gordicaleksa/pytorch-neural-style-transfer-johnson 
- https://github.com/Lornatang/CycleGAN-PyTorch 
