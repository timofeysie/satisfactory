import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  @Input() articles: any[];
}
