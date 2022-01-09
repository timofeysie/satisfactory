# cartoonify

Image generating app using the pretrained models by [CartoonGAN](http://openaccess.thecvf.com/content_cvpr_2018/CameraReady/2205.pdf) `[Chen et al., CVPR18]`

```html
<p>
    <img src='test_img/rm2014.jpg' width=300 />
    <img src='cartooned_img/rm2014_Hayao.jpg' width=300 />
</p>
```

## Getting started

The code runs on both Windows and Linux and it support both GPU and CPU.

## Dependencies

- Pytorch (install [Pytorch](https://pytorch.org/) according to your OS, Package, and Compute platform)

```shell
git clone https://github.com/timofeysie/cartoonify.git
cd cartoonify
```

## Download pretrained models

- Download the models in '.pth' format:

```sh
sh pretrained_model/download_pth.sh
```

- Run the command below for testing:
- There are four models are available to choose:

```sh
python test.py --input_dir YourImgDir --style {Hosoda/Hayao/Paprika/Shinkai} --gpu 0
```

- Or you can run the shell:

```sh
sh test.sh
```

```sh
python test.py --style Hosoda --gpu 0
python test.py --style Hayao --gpu 0
python test.py --style Paprika --gpu 0
python test.py --style Shinkai --gpu 0
```

## Examples (Left: input, Right: output)

```html
<p>
    <img src='test_img/Ocean-Storm.jpg' width=300 />
    <img src='cartooned_img/Ocean-Storm_Hosoda.jpg' width=300 />
</p>

<p>
    <img src='test_img/paris.jpg' width=300 />
    <img src='cartooned_img/paris_Hayao.jpg' width=300 />
</p>

<p>
    <img src='test_img/london.jpg' width=300 />
    <img src='cartooned_img/london_Hosoda.jpg' width=300 />
</p>

<p>
    <img src='test_img/sr4king.jpg' width=300 />
    <img src='cartooned_img/sr4king_Hosoda.jpg' width=300 />
</p>

<p>
    <img src='test_img/Switzerland.jpg' width=300 />
    <img src='cartooned_img/Switzerland_Hosoda.jpg' width=300 />
</p>
```

## Acknowledgement

- The models in this project were trained by [CartoonGAN](http://openaccess.thecvf.com/content_cvpr_2018/CameraReady/2205.pdf) `[Chen et al., CVPR18]` and converted into '.pth' format by [Yijunmaverick](https://github.com/Yijunmaverick/CartoonGAN-Test-Pytorch-Torch)
- The code is heavily borrowed from [CartoonGAN-Test-Pytorch-Torch](https://github.com/Yijunmaverick/CartoonGAN-Test-Pytorch-Torch)
