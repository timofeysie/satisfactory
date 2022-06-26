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
    const fileName = createImageDto.fileName;
    if (this.isEncoded(fileName)) {
      console.log('file encoded');
    } else {
      console.log('file un-encoded, encoding');
      // fileName = encodeURIComponent(fileName);
      // fileName = this.encodeUriAll(fileName);
    }
    const imagePath = dir + fileName;
    const imageNameAndExtension = this.removeFileExt(fileName);
    const newName =
      imageNameAndExtension.fileName +
      '-' +
      createImageDto.aspect +
      imageNameAndExtension.extension;
    const saveImagePath = dir + newName;
    Sharp(imagePath)
      .extract({
        left: createImageDto.new.left,
        top: createImageDto.new.top,
        width: createImageDto.new.width,
        height: createImageDto.new.height,
      })
      .toFile(saveImagePath, (err) => {
        if (err) {
          console.log(
            'ImageService.create: done creating',
            newName,
            createImageDto
          );
          console.log(
            'ImageService.create: err creating aspect ' +
              createImageDto.aspect +
              ' ' +
              newName,
            err
          );
        }
        // Extract a region of the input image, saving in the same format.
      });
    return newName;
  }

  removeFileExt(text: string) {
    const dot = text.lastIndexOf('.');
    const newText = text.substring(0, dot);
    const ext = text.substring(dot, text.length);
    const result = {
      fileName: newText,
      extension: ext,
    };
    return result;
  }

  findAll() {
    return `This action returns all image`;
  }

  /**
   * Return the meta data for an image.
   * @param imageName the file name for it's location indist/apps/public/
   */
  async findOne(imageName: string) {
    console.log('ImageService.findOne: imageName', imageName);
    const encodedFileName = imageName;
    if (this.isEncoded(imageName)) {
      console.log('file encoded');
    } else {
      console.log('file un-encoded');
      //encodedFileName = encodeURIComponent(imageName);
      //encodedFileName = this.encodeUriAll(encodedFileName);
    }
    const dir = 'dist/apps/public/';
    const imagePath = dir + encodedFileName;
    console.log('ImageService.findOne: imagePath', imagePath);
    const image = Sharp(imagePath);
    return new Promise((resolve) => {
      image.metadata().then((metadata) => {
        console.log('ImageService.findOne: meta', metadata);
        resolve(metadata);
      });
    });
  }

  /**
   * Decode, compare to original. If it does differ, original is encoded. If it doesn't differ, original isn't encoded.
   * @param imageName
   */
  isEncoded(imageName) {
    const decodedImageName = decodeURI(imageName);
    if (imageName === decodedImageName) {
      return false;
    } else {
      return true;
    }
  }

  encodeUriAll(value) {
    return value.replace(
      // eslint-disable-next-line no-useless-escape
      /[\(\)]/g,
      (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
    );
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
