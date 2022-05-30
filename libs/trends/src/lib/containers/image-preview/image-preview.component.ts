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

  constructor(private trendsService: TrendsService) {}

  get items() {
    return this._imageFileName.getValue();
  }

  ngOnInit() {
    this._imageFileName.subscribe((fileName) => {
      console.log('fileName', fileName);
      this.trendsService.getImageMetadata(fileName).subscribe((result) => {
        console.log('result', result);
        this.metaData = result;
        // setup initial offsets
        const body = this.preparePostBody(result, 0, 0);
        // call new POST endpoint.
        
      });
    });
  }

  preparePostBody(
    _metaData: any,
    leftOffsetPre?: number,
    topOffsetPre?: number
  ) {
    const body = {
      path: '',
      fileName: 'xxx',
      original: { width: 535, height: 921 },
    };
    body['portrait'] = this.getAspectRation(_metaData, 640, 0, 0);
    body['landscape'] = this.getAspectRation(_metaData, 640, 0, 0);
    body['square'] = this.getAspectRation(_metaData, 640, 0, 0);
    console.log('body', body);
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
