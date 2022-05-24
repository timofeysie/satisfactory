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
  constructor(private trendsService: TrendsService) {}

  get items() {
    return this._imageFileName.getValue();
  }

  ngOnInit() {
    this._imageFileName.subscribe((fileName) => {
      console.log('fileName', fileName);
      this.trendsService.getImageMetadata(fileName).subscribe((result) => {
        console.log('result', result);
      })
    });
  }
}
