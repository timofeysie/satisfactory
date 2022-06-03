import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import Sharp from 'sharp';
import { faPortrait } from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class ImageService {
  /**
   * portrait  720 x 960
   * square 720 x 720
   * landscape 720 x 541
   * regular 720 x 1279
   *
   * payload:
   *   path: "",
   *   fileName: "xxx",
   *   original: { width: 535, height: 921 },
   *   portrait: { left: leftOffsetPre, top: topOffsetPre, width: widthPre, height: heightPre },
   *   landscape: { left: leftOffsetPre, top: topOffsetPre, width: widthPre, height: heightPre },
   *   square: {left: leftOffsetPre, top: topOffsetPre, width: widthPre, height: heightPre },
   */
  create(createImageDto: any) {
    console.log('ImageService.create', createImageDto);
    const dir = createImageDto.path;
    const imagePath = dir + createImageDto.fileName;
    const imageNameAndExtension = this.removeFileExt(createImageDto.fileName);
    const newName =
      imageNameAndExtension.fileName +
      '-' +
      createImageDto.aspect +
      imageNameAndExtension.extension; 
    const saveImagePath = dir + newName;
    console.log('imagePath', imagePath);
    const image = Sharp(imagePath);
    image.metadata().then((metadata) => {
      console.log('meta', metadata);
      Sharp(imagePath)
        .extract({
          left: createImageDto.new.left,
          top: createImageDto.new.top,
          width: createImageDto.new.width,
          height: createImageDto.new.height,
        })
        .toFile(saveImagePath, (err) => {
          console.log('done creating', newName);
          if (err) {
            console.log('err creating ' + newName, err);
          }
          // Extract a region of the input image, saving in the same format.
        });
    });
    return newName;
  }

  removeFileExt(text: string) {
    const dot = text.lastIndexOf('.');
    const newText = text.substring(0, dot);
    const ext = text.substring(dot, text.length);
    const result = {
      fileName: newText,
      extension: ext
    }
    return result;
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
