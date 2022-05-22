import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import Sharp from 'sharp';

@Injectable()
export class ImageService {
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(imageName: string) {
    const imagePath = 'dist/apps/nest-demo/'+imageName;
    const saveImagePath = 'dist/apps/nest-demo/saved' + imageName;
    console.log('imagePath', imagePath);
    const image = Sharp(imagePath);
    image
      .metadata()
      .then((metadata) => {
        console.log('meta', metadata);
        Sharp(imagePath)
          .extract({
            left: 150,
            top: 150,
            width: metadata.width - 200,
            height: metadata.height - 200,
          })
          .toFile(saveImagePath, (err) => {
            console.log('done');
            if (err) {
              console.log('err', err);
            }
            // Extract a region of the input image, saving in the same format.
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
