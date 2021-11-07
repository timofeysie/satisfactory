import { Component, Input, OnInit, Output } from '@angular/core';
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
    const dashTitle = this.trendTitleSeen.split(' ').join('-');
    this.newNewsLink = 'https://apnews.com/hub/' + dashTitle;
    this.newWikiSearchTerm = this.trendTitleSeen;
    this.topicForm.controls.linkUrl.setValue(this.newNewsLink);
  }

  onUpdatedWikiSearchTerm() {
    this.newWikiSearchTerm = this.topicForm.value.links.wikiLink;
  }

  onUpdatedNewsSearchTerm() {
    this.newNewsLink = this.topicForm.value.links.newsLink;;
  }
}
