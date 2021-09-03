import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-app-picture-cards',
  templateUrl: './picture-cards.component.html',
  styleUrls: ['./picture-cards.component.scss'],
})
export class PictureCardsComponent implements OnInit {
  currentRoute: string;
  trend;

  trends = {
    Qivit_Tittysure: {
      description:
        'Qivit Tittysure is the soft, dense, light-brown woolly undercoat of the quoll and a small quantity of left over fluff.',
      linkUrl:
        'https://en.wikipedia.org/wiki/Mike_Richards_(television_personality)',
      linkLabel: 'Wikipedia',
      one: {
        pictureTitle: 'One title',
        altText: 'Same as title',
        imageSrc:
          './../assets/pictures/mike-richards/toonify-mike-richards.jpg',
        description: 'This is a description of one',
      },
      two: {
        pictureTitle: 'Two title',
        altText: 'Same as title',
        imageSrc:
          './../assets/pictures/mike-richards/toonify-mike-richards.jpg',
        description: 'This is a description of two',
      },
    },
  };

  constructor(private router: Router) {
    const currentRoute = router.url;
    const slash = currentRoute.lastIndexOf('/');
    const lastPart = currentRoute.substring(slash + 1, currentRoute.length);
    const topic = lastPart.replace('%20', '_');
    this.trend = this.trends[topic];
  }

  ngOnInit(): void {}
}
