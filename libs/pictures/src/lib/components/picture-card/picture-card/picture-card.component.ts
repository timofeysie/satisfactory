import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'demo-app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss'],
})
export class PictureCardComponent implements OnInit {
  @Input() picture: any;
  constructor() {}

  ngOnInit(): void {}
}
