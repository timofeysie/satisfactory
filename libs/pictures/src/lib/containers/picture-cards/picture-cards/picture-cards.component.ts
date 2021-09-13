import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'demo-app-picture-cards',
  templateUrl: './picture-cards.component.html',
  styleUrls: ['./picture-cards.component.scss'],
})
export class PictureCardsComponent {
  currentRoute: string;
  trend;

  trends = {
    Qivit_Tittysure: {
      pageTitle: 'Qivit Tittysure',
      author: 'Transition Cat, Toonify, Henry Curchod',
      keywords: 'Qivit Tittysure, portrait, artwork',
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
      pageTitle: 'Kylie Jenner',
      author: 'Transition Cat, Toonify, Henry Curchod',
      keywords: 'Kylie Jenner, portrait, artwork',
      description: `In April 2017, Jenner was first seen with Travis Scott at Coachella. 
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

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {
    const currentRoute = router.url;
    const slash = currentRoute.lastIndexOf('/');
    const lastPart = currentRoute.substring(slash + 1, currentRoute.length);
    const topic = lastPart.replace('%20', '_');
    this.trend = this.trends[topic];
    this.meta.addTags([
      { name: 'description', content: this.trend.description },
      { name: 'author', content: this.trend.author },
      { name: 'keywords', content: this.trend.keywords },
      { name: 'twitter:card', content: this.trend.pageTitle },
      { name: 'og:url', content: '/' },
      { name: 'og:title', content: this.trend.pageTitle },
      { name: 'og:description', content: this.trend.description },
      { name: 'og:image', content: this.trend.two.imageSrc },
    ]);
    this.setTitle(this.trend.pageTitle);
  }

  public setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
}
