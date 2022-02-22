import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'demo-app-common-images',
  templateUrl: './common-images.component.html',
  styleUrls: ['./common-images.component.scss'],
})
export class CommonImagesComponent implements OnInit {
  @Input() images: string[];
  @Input() searchTerm: string;
  @Output() updateSearchTerm = new EventEmitter<string>();
  @Output() selectedCommonsImage = new EventEmitter<string>();
  @Output() selectedImageType = new EventEmitter<boolean>();
  newSearch: string;
  selectedCommonImage: any;
  selectTwo = false;

  ngOnInit() {
    this.newSearch = this.searchTerm;
  }

  public toggleSelectType(event: MatSlideToggleChange) {
    this.selectTwo = event.checked;
    this.selectedCommonImage = null;
    this.selectedImageType.emit(event.checked);
  }

  selectCommonImage(image: any) {
    this.selectedCommonImage = image;
    this.selectedCommonsImage.emit(image);
  }

  onUpdate() {
    this.updateSearchTerm.emit(this.searchTerm);
  }
}
