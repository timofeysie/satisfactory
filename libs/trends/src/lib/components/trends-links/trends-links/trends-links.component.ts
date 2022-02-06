import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() handleNewWikiSearchTerm = new EventEmitter<string>();
  @Output() handleNewAPSearchTerm = new EventEmitter<string>();
  newNewsLink: string;
  newWikiSearchTerm: string;

  ngOnInit() {
    const dashTitle = this.trendTitleSeen.split(' ').join('-');
    this.newNewsLink = 'https://apnews.com/hub/' + dashTitle;
    this.handleNewAPSearchTerm.emit(this.newNewsLink);
    this.newWikiSearchTerm = this.trendTitleSeen;
  }

  onUpdatedWikiSearchTerm() {
    this.newWikiSearchTerm = this.topicForm.value.links.wikiLink;
    this.handleNewWikiSearchTerm.emit(this.newWikiSearchTerm);
  }

  onSelectWikiSearchTerm(event) {
    if (event.checked) {
      this.onUpdatedWikiSearchTerm();
    }
  }

  onUpdatedNewsSearchTerm() {
    this.newNewsLink =
      this.topicForm.value.links.newsLink;
    this.handleNewAPSearchTerm.emit(this.newNewsLink);
  }

  onSelectNewsSearchTerm(event) {
    if (event.checked) {
      this.onUpdatedNewsSearchTerm();
    }
  }
}
