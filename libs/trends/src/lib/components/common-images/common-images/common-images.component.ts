import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-app-common-images',
  templateUrl: './common-images.component.html',
  styleUrls: ['./common-images.component.scss'],
})
export class CommonImagesComponent implements OnInit {
  @Input() images: string[];
  @Input() searchTerm: string;
  @Output() updateSearchTerm = new EventEmitter<string>();
  newSearch: string;
  selectedCommonImage: any;

  ngOnInit() {
    this.newSearch = this.searchTerm;
  }

  selectCommonImage(image: any) {
    console.log('image', image);
    this.selectedCommonImage = image;
  }

  onSubmit() {
    this.updateSearchTerm.emit(this.searchTerm);
  }
}
