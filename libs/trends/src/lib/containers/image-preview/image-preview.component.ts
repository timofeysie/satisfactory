import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private trendsService: TrendsService) {}

  get items() {
    return this._imageFileName.getValue();
  }

  ngOnInit() {
    this._imageFileName.subscribe((fileName) => {
      this.trendsService.getImageMetadata(fileName).subscribe((result) => {
        this.metaData = result;
        // setup initial offsets
        const body = this.preparePostBody(fileName, 'portrait', JSON.parse(result), 0, 0);
        this.portraitData = body;
        this.trendsService.postImageMetadata(body).subscribe((result2) => {
          console.log('post result', result2);
        });
      });
    });
  }

  preparePostBody(
    fileName: string,
    aspect: string,
    _metaData: any,
    leftOffsetPre?: number,
    topOffsetPre?: number
  ) {
    const body = {
      path: 'apps/toonify/src/test_img/',
      fileName: fileName,
      original: { width: _metaData.width, height: _metaData.height },
      aspect: aspect,
    };
    const height = this.getHeight(aspect);
    body['new'] = this.getAspectRation(
      _metaData,
      height,
      leftOffsetPre,
      topOffsetPre
    );
    return body;
  }

  getHeight(aspect) {
    let height;
    if (aspect === 'portrait') {
      height = 640;
    } else if (aspect === 'landscape') {
      height = 640;
    } else if (aspect === 'square') {
      height = 640;
    }
    return height;
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
    leftOffsetPre: number,
    topOffsetPre: number
  ) {
    const originalRatio = _metaData.width / _metaData.height;
    const newWidth = Math.round(newHeight * originalRatio);
    const results = {
      left: leftOffsetPre,
      top: topOffsetPre,
      width: newWidth,
      height: newHeight,
    };
    return results;
  }
}
