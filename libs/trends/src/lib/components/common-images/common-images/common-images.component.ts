import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-app-common-images',
  templateUrl: './common-images.component.html',
  styleUrls: ['./common-images.component.scss'],
})
export class CommonImagesComponent {
  @Input() images: string[];
}
