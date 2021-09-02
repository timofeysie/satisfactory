import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'demo-app-mike-richards',
  templateUrl: './mike-richards.component.html',
  styleUrls: ['./mike-richards.component.scss'],
})
export class MikeRichardsComponent {
  cardData = [
    {
      title: 'Title 1',
      imageUrl: 'assets/images/image1.png',
    },
    {
      title: 'Title 2',
      imageUrl: 'assets/images/image2.png',
    },
  ];
  
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTags([
      { name: 'description', content: 'Art about Mike Richards' },
      { name: 'author', content: 'Transition Cat, Toonify, Henry Curchod' },
      { name: 'keywords', content: 'MIke Richards, Milk duck' },
    ]);
    this.setTitle('Mike Richards Art');
  }

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
}
