import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import Sharp from 'sharp';

@Injectable()
export class ImageService {
  /**
   * portrait  720 x 960
   * square 720 x 720
   * landscape 720 x 541
   * regular 720 x 1279
   */
  create(createImageDto: CreateImageDto) {
    const dir = 'apps/toonify/src/test_img/';
    const imagePath = dir + encodeURI(createImageDto.imageName);
    const saveImagePath = dir + 'new' + encodeURI(createImageDto.imageName);
    console.log('imagePath', imagePath);
    const image = Sharp(imagePath);
    image.metadata().then((metadata) => {
      console.log('meta', metadata);
      const originalRatio = metadata.width / metadata.height;
      const portraitHeight = 640;
      const portraitWidth = Math.round(portraitHeight * originalRatio);
      Sharp(imagePath)
        .extract({
          left: metadata.width / 4,
          top: metadata.height / 4,
          width: portraitWidth,
          height: portraitHeight,
        })
        .toFile(saveImagePath, (err) => {
          console.log('done');
          if (err) {
            console.log('err', err);
          }
          // Extract a region of the input image, saving in the same format.
        });
    });
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  /**
   * Return the meta data for an image.
   * @param imageName the file name for it's location in apps/toonify/src/test_img/
   */
  async findOne(imageName: string) {
    const dir = 'apps/toonify/src/test_img/';
    const imagePath = dir + encodeURI(imageName);
    const image = Sharp(imagePath);
    return new Promise((resolve) => {
      image.metadata().then((metadata) => {
        console.log('meta', metadata);
        resolve(metadata);
      });
    });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
