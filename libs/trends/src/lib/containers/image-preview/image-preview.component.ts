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

  get items() {
    return this._imageFileName.getValue();
  }

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
          this.setupPosters(fileName, sharpMetadata, 'landscape');
          this.setupPosters(fileName, sharpMetadata, 'square');
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
    const width = this.getWidth(aspect, _metaData);
    const height = this.getHeight(aspect, _metaData);
    console.log('--------------------------', aspect);
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
    body['new'] = this.getAspectRatio(
      _metaData,
      height,
      leftOffsetPre,
      topOffsetPre,
      aspect
    );
    return body;
  }

  getOffsetPre(
    aspect: string,
    length: number,
    originalLength: number,
    originalOtherLength: number
  ) {
    const spaceRemaining = originalLength - length;
    const newLength = spaceRemaining / 2;
    if (aspect === 'square' && originalOtherLength > originalLength) {
      // this depends on the original dimensions.
      // Whichever is longer should get the crop.
     //  newLength = 0;
    }
    const rounded = Math.round(newLength);
    console.log('orig len: ' + originalLength + ' - ' + length + ' = ' + spaceRemaining + ' / 2 = ' + rounded);
    return rounded;
  }

  /**
   * Limit the height values to the default dog values.
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
  getHeight(aspect: string, _metaData: any) {
    const originalHeight = _metaData.height;
    let height = originalHeight;
    if (aspect === 'portrait') {
      if (originalHeight > 960) {
        height = 960;
      }
    } else if (aspect === 'landscape') {
      if (originalHeight > 541) {
        height = 541;
      }
    } else if (aspect === 'square') {
      if (originalHeight > 720) {
        height = 720;
      }
    }
    return height;
  }

  /**
   * Instagram portrait 1080 x 1350
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
    let width;
    if (aspect === 'portrait') {
      width = originalWidth;
      if (originalWidth > 720) {
        width = 720;
      }
    } else {
      width = originalWidth;
    }
    return width;
  }

  /**
   * Divide the original height by the original width for the portrait ratio.
   * Divide the original width by the original height for the landscape ratio.
   * and then multiply this number by the new width to get the new height.
   * portrait height: 640
   * @param type
   * @param _metaData
   */
  getAspectRatio(
    _metaData: any,
    newHeight: number,
    leftOffsetPre: number,
    topOffsetPre: number,
    aspect
  ) {
    let newWidth;
    if (aspect === 'square') {
      newWidth = newHeight;
    }
    if (aspect === 'portrait') {
      const ratio = _metaData.height / _metaData.width;
      newWidth = Math.round(ratio * _metaData.height);
    }
    if (aspect === 'landscape') {
      const ratio = _metaData.height / _metaData.width;
      newWidth = Math.round(ratio * _metaData.height);
    }
    const results = {
      left: leftOffsetPre,
      top: topOffsetPre,
      width: newWidth,
      height: newHeight,
    };
    return results;
  }
}
