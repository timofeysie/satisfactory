import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ControlContainer,
} from '@angular/forms';

@Component({
  selector: 'demo-app-trends-links',
  templateUrl: './trends-links.component.html',
  styleUrls: ['./trends-links.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class TrendsLinksComponent implements OnInit {
  @Input() trendTitleSeen: string;
  @Input() topicForm: FormGroup;
  newNewsLink: string;
  newWikiSearchTerm: string;

  ngOnInit() {
    this.newNewsLink = 'https://apnews.com/article/' + this.trendTitleSeen;
    this.newWikiSearchTerm = this.trendTitleSeen;
  }

  onUpdatedWikiSearchTerm() {
    this.newWikiSearchTerm = this.topicForm.value.links.wikiLink;
  }

  onUpdatedNewsSearchTerm() {
    this.newNewsLink = this.topicForm.value.links.newsLink;;
  }
}
