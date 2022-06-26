import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TrendsService } from '../../services/trends/trends.service';

@Component({
  selector: 'demo-app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit {
  @Input() set imageFileName(value: string) {
    this._imageFileName.next(value);
  }
  get imageFileName() {
    return this._imageFileName.getValue();
  }
  private _imageFileName = new BehaviorSubject<string>('');
  metaData: any;
  portraitData: any;
  portraitImg: string;
  landscapeData: any;
  landscapeImg: string;
  squareData: any;
  squareImg: string;

  constructor(
    private trendsService: TrendsService,
    private sanitizer: DomSanitizer
  ) {}

  /**
   * Get the meta data from the original image from the backend api/image GET endpoint,
   * calculate the aspect details needed to crop the image and POST those which will
   * result in the particular aspect file asked for.
   */
  ngOnInit() {
    this._imageFileName.subscribe((fileName) => {
      this.trendsService
        .getImageMetadata(fileName)
        .subscribe((sharpMetadata) => {
          this.metaData = sharpMetadata;
          // setup initial offsets
          this.setupPosters(fileName, sharpMetadata, 'portrait');
         //  this.setupPosters(fileName, sharpMetadata, 'landscape');
          // this.setupPosters(fileName, sharpMetadata, 'square');
        });
    });
  }

  /**
   * POST the prepared body payload for a particular aspect to generate the poster image.
   * @param fileName
   * @param sharpMetadata
   * @param aspect
   */
  setupPosters(fileName: string, sharpMetadata: any, aspect: string) {
    const body = this.preparePostBody(
      fileName,
      aspect,
      JSON.parse(sharpMetadata)
    );
    // The zero values above will be replaced with centered crops after we know the new dimensions
    this.trendsService.postImageMetadata(body).subscribe((newFileName) => {
      this.setAspectData(newFileName, aspect, body);
    });
  }

  /**
   * Set the values for the aspects so they can be used in the template.
   * @param newFileName
   * @param aspect
   * @param body
   */
  setAspectData(newFileName, aspect, body) {
    if (aspect === 'portrait') {
      this.portraitData = body;
      this.portraitData['newFileName'] = decodeURI(newFileName);
      this.portraitImg = 'http://localhost:3333/public/' + newFileName;
    }
    if (aspect === 'landscape') {
      this.landscapeData = body;
      this.landscapeData['newFileName'] = decodeURI(newFileName);
      this.landscapeImg = 'http://localhost:3333/public/' + newFileName;
    }
    if (aspect === 'square') {
      this.squareData = body;
      this.squareData['newFileName'] = decodeURI(newFileName);
      this.squareImg = 'http://localhost:3333/public/' + newFileName;
    }
  }

  /**
   * Avoid the unsafe error.
   * @param aspect
   * @returns
   */
  getSafeUrl(aspect: string) {
    if (aspect === 'portrait') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.portraitImg);
    }
    if (aspect === 'landscape') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.landscapeImg);
    }
    if (aspect === 'square') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.squareImg);
    }
  }

  /**
   * Determine the width and the height and calculate the aspect of the posters.
   * @param fileName
   * @param aspect
   * @param _metaData
   * @param leftOffsetPre
   * @param topOffsetPre
   * @returns the payload body for the api/image POST
   */
  preparePostBody(fileName: string, aspect: string, _metaData: any) {
    const body = {
      path: 'dist/apps/public/',
      fileName: fileName,
      original: { width: _metaData.width, height: _metaData.height },
      aspect: aspect,
    };
    let width;
    let height;
    if (aspect === 'landscape') {
      // first get the desired with, either 720 or original width if it's smaller than that
      // i.e. the longest width up to 720.
      width = this.getWidth(aspect, _metaData);
      // calculate the new hight based on the aspect and the desired with
      //height = this.getHeight(aspect, _metaData, width);
      height = this.getRatioLength(_metaData, width, height, aspect);
    }
    if (aspect === 'portrait') {
      // get desired width
      width = this.getWidth(aspect, _metaData);
      height = this.getRatioLength(_metaData, width, height, aspect);
    }
    if (aspect === 'square') {
      height = this.getHeight(aspect, _metaData);
      width = this.getRatioLength(_metaData, width, height, aspect);
    }
    const leftOffsetPre = this.getOffsetPre(
      aspect,
      width,
      _metaData.width,
      _metaData.length
    );
    const topOffsetPre = this.getOffsetPre(
      aspect,
      height,
      _metaData.height,
      _metaData.width
    );
    // need to pass both width and height here
    body['new'] = {
      left: leftOffsetPre,
      top: topOffsetPre,
      width: width,
      height: height,
    };
    if (aspect === 'landscape') {
      // ???
    }
    return body;
  }

  /**
   * Calculate a new length from a desired length of an aspect ratio. 
   * @param _metaData 
   * @param width 
   * @param height 
   * @param aspect 
   * @returns height for portrait or width for landscape, smallest length for square.
   */
  getRatioLength(
    _metaData: any,
    width: number,
    height: number,
    aspect: string
  ) {
    let newWidth;
    let newHeight;
    if (aspect === 'square') {
      if (width < height) {
        return width;
      } else {
        return height;
      }
    }
    if (aspect === 'portrait') {

        const ratio = 4/3;
        newHeight = Math.round(ratio * width);
        return newHeight;
    }
    if (aspect === 'landscape') {
      // if width is greater than 720
      if (width >= 720) {
        return 720;
      } else {
        const ratio = 4/3;
      newWidth = Math.round(ratio * height);
      return newWidth;
      }
    }
  }

  getOffsetPre(
    aspect: string,
    length: number,
    originalLength: number,
    originalOtherLength: number
  ) {
    const spaceRemaining = originalLength - length; // Nan
    const newLength = spaceRemaining / 2;
    if (aspect === 'square' && originalOtherLength > originalLength) {
      // this depends on the original dimensions.
      // Whichever is longer should get the crop.
      //  newLength = 0;
      // this can be removed if what is done in the getHeight/Length works
      // do it
    }
    if (aspect === 'landscape') {
      // newLength = originalLength;
      // use new length
    }
    let rounded = Math.round(newLength);
    if (rounded > 2) {
      rounded = rounded - 2;
    }
    if (isNaN(rounded)) {
      rounded = 0;
    }
    if (aspect === 'landscape') {
      // 956 - NaN = NaN / 2 = NaN
      console.log(
        'orig len: ' +
          originalLength +
          ' - ' +
          length +
          ' = ' +
          spaceRemaining +
          ' / 2 = ' +
          rounded
      );
    }
    return rounded;
  }

  /**
   * Limit the height values to the default dog values.
   *
   * The landscape height should be calculated from the desired width
   * which would be the original width or 720 if its greater than that.
   *
   *
   * Instagram portrait 1080 x 1350
   * story_dog2_portrait.jpg  720 x 960
   * story_dog2_landscape.jpg 720 x 541
   * story_dog2_square.jpg 720 x 720
   * @param aspect
   * @param _metaData
   * @returns the height.
   *   original: { width: 1086, height: 796 },
   * aspect: 'portrait',
   * new: { left: 20, top: 0, width: 720, height: 982 }
   */
  getHeight(aspect: string, _metaData: any, desiredWidth?: number) {
    const originalHeight = _metaData.height;
    let height = originalHeight;
    if (aspect === 'portrait') {
      if (originalHeight > 960) {
        height = 960;
      } else {
        height = originalHeight;
      }
    } else if (aspect === 'landscape') {
      // height doesn't matter, as it will be calculated by the width
      if (originalHeight > 541) {
        height = 541;
      } else {
        height = originalHeight;
      }
    } else if (aspect === 'square') {
      let min = _metaData.width;
      if (min > _metaData.height) {
        min = _metaData.height;
      }
      if (min > 720) {
        height = 720;
      } else {
        height = min;
      }
    }
    if (aspect === 'landscape') {
      // again ???
    }
    return height;
  }

  /**
   * Instagram portrait 1080 x 1350
   *
   * Original story_dog2.jpg 720 x 1279
   * story_dog2_portrait.jpg  720 x 960
   * story_dog2_landscape.jpg 720 x 541
   * story_dog2_square.jpg 720 x 720
   *
   * The width of portrait should be limited as the width are of the others.
   *
   * @param aspect
   * @param _metaData
   * @param height
   * @returns the width
   */
  getWidth(aspect: string, _metaData: any) {
    const originalWidth = _metaData.width;
    let width = originalWidth;
    if (aspect === 'portrait') {
      if (originalWidth > 720) {
        width = 720;
      } else {
        width = originalWidth;
      }
    } else {
      width = originalWidth;
    }
    if (aspect === 'landscape') {
      if (originalWidth > 541) {
        width = 541;
      } else {
        width = originalWidth;
      }
    }
    return width;
  }

}
