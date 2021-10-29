import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'demo-app-trends-links',
  templateUrl: './trends-links.component.html',
  styleUrls: ['./trends-links.component.scss'],
})
export class TrendsLinksComponent implements OnInit {
  @Input() trendTitleSeen: string;
  newNewsLink: string;
  newWikiSearchTerm: string;

  ngOnInit() {
    this.newNewsLink = 'https://apnews.com/article/'+this.trendTitleSeen;
    this.newWikiSearchTerm = this.trendTitleSeen;
    console.log('this.trendTitleSeen;', this.trendTitleSeen);
  }

}
