# NST (Neural Style Transfer) notes:
NST Pytorch pretrained models and training script have been added into the project. 

## Files
- apps/toonify/src/NST_train_single_image.py >> Run this file to train NST on a new style and input pair. At least 2000 epochs are recommended. 
- apps/toonify/src/stylization_script.py >> Run this file to tranfer input image into pretrained styles. There are 4 pretrained models are available in models/binaries folder.
- apps/toonify/src/training_script.py >> To train NST on new style. This will save the pretrained model which can be used to transfer images afterwards. 
- apps/toonify/src/utils/ >> This utils folder consists of scripts for download pretrained models from dropbox and other helper functions. 

## Acknowledgement 
The code and pretrained models were borrowed from the following sources with minimum changes.  
- https://github.com/Octaves0911/Neural_Style_Transfer 
- https://github.com/gordicaleksa/pytorch-neural-style-transfer-johnson 
