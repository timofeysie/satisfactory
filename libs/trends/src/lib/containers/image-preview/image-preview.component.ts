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
    console.log('ngOnInit');
    this._imageFileName.subscribe((fileName) => {
      console.log('fileName', fileName);
      this.trendsService
        .getImageMetadata(fileName)
        .subscribe((sharpMetadata) => {
          console.log('trendsService.getImageMetadata: result', sharpMetadata);
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
      JSON.parse(sharpMetadata),
      0,
      0
    );
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
      console.log('this.portraitImg', this.portraitImg);
    }
    if (aspect === 'landscape') {
      this.landscapeData = body;
      this.landscapeData['newFileName'] = decodeURI(newFileName);
      this.landscapeImg = 'http://localhost:3333/public/' + newFileName;
      console.log('this.portraitImg', this.landscapeImg);
    }
    if (aspect === 'square') {
      this.squareData = body;
      this.squareData['newFileName'] = decodeURI(newFileName);
      this.squareImg = 'http://localhost:3333/public/' + newFileName;
      console.log('this.portraitImg', this.squareImg);
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
  preparePostBody(
    fileName: string,
    aspect: string,
    _metaData: any,
    leftOffsetPre?: number,
    topOffsetPre?: number
  ) {
    const body = {
      path: 'dist/apps/public/',
      fileName: fileName,
      original: { width: _metaData.width, height: _metaData.height },
      aspect: aspect,
    };
    const height = this.getHeight(aspect, _metaData);
    const width = this.getWidth(aspect, _metaData);
    body['new'] = this.getAspectRation(
      _metaData,
      height,
      width,
      leftOffsetPre,
      topOffsetPre,
      aspect
    );
    return body;
  }

  /**
   * Limit the height values to the default dog values.
   * Instagram portrait 1080 x 1350
   * story_dog2_portrait.jpg  720 x 960
   * story_dog2_landscape.jpg 720 x 541
   * story_dog2_square.jpg 720 x 720
   *
   * @param aspect
   * @param _metaData
   * @returns
   */
  getHeight(aspect: string, _metaData: any) {
    console.log('_metaData', _metaData);
    const orginialHeight = _metaData.height;
    let height;
    if (aspect === 'portrait') {
      height = orginialHeight;
      if (orginialHeight > 960) {
        height = 960;
      }
    } else if (aspect === 'landscape') {
      height = orginialHeight;
      if (orginialHeight > 541) {
        height = 541;
      }
    } else if (aspect === 'square') {
      height = orginialHeight;
      if (orginialHeight > 720) {
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
   * @returns
   */
  getWidth(aspect: string, _metaData: any) {
    const orginialWidth = _metaData.width;
    let width;
    if (aspect === 'portrait') {
      width = orginialWidth;
      if (orginialWidth > 720) {
        width = 720;
      }
    } 
    return width;
  }

  /**
   * Divide the original height by the original width
   * and then multiply this number by the new width to get the new height.
   * portrait height: 640
   *
   * @param type
   * @param _metaData
   */
  getAspectRation(
    _metaData: any,
    newHeight: number,
    width: number,
    leftOffsetPre: number,
    topOffsetPre: number,
    aspect
  ) {
    const originalRatio = _metaData.width / _metaData.height;
    console.log('originalRatio', originalRatio);
    let newWidth = Math.round(newHeight * originalRatio);
    const calculatedwHeight = Math.round(width * originalRatio);
    if (aspect === 'square') {
      newWidth = newHeight;
    }
    if (aspect === 'portrait') {
      newWidth = width;
      newHeight = calculatedwHeight;
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
