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
      linkUrl: 'https://en.wikipedia.org/wiki/Quoll',
      linkLabel: 'Wikipedia',
      one: {
        title: 'One title',
        altText: 'Same as title',
        imageSrc: './../assets/pictures/qivit-tittysure/qivit-tittysure-1.PNG',
        description: 'This is a description of one',
      },
      two: {
        title: 'Two title',
        altText: 'Same as title',
        imageSrc: './../assets/pictures/qivit-tittysure/qivit-tittysure-2.PNG',
        description: 'This is a description of two',
      },
    },
    Kylie_Jenner: {
      description:
        `In April 2017, Jenner was first seen with Travis Scott at Coachella. 
        On February 1, 2018, Jenner gave birth to their daughter, Stormi Webster.
        Jenner appeared in the music video for "Stop Trying to Be God", 
        from Scott's third studio album Astroworld. 
        They broke up in September 2019, 
        but quarantined together during the COVID-19 pandemic for the sake of their daughter. 
        As of August 2021, Jenner is reported to be pregnant with their second child.`,
      linkUrl: 'https://en.wikipedia.org/wiki/Kylie_Jenner',
      linkLabel: 'Wikipedia',
      one: {
        pictureTitle: 'Kylie Jenner by Toonify',
        altText: 'Kylie Jenner by Toonify',
        imageSrc:
          './../assets/pictures/kylie-jenner/kylie-jenner-by-toonify.jpg',
        description:
          'Kylie Jenner is entrenched in the war can earn her crown as the highest rated youngest of the closest.',
      },
      two: {
        pictureTitle: 'Kylie Jenner by Toonify',
        altText: 'Kylie Jenner by Toonify',
        imageSrc:
          './../assets/pictures/kylie-jenner/kylie-jenner-by-transitioncat.jpg',
        description: 'Sibling rivalry begins again.',
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
