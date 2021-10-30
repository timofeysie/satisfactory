import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TrendsState } from './../../+state/trends.reducer';
import { Store, select } from '@ngrx/store';
import { trendsQuery } from './../../+state/trends.selectors';
import { Observable } from 'rxjs';
import { Trend } from '@demo-app/data-models';
import * as TrendsActions from '../../+state/trends.actions';
import { TrendsService } from '../../services/trends/trends.service';
import { TrendsListComponent } from '../trends-list/trends-list.component';

@Component({
  selector: 'demo-app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
})
export class TrendsComponent implements OnInit {
  @ViewChild(TrendsListComponent)
  private trendsListDetail: TrendsListComponent;
  trends$: Observable<Trend[]>;
  commonImages: string[];
  trendTitleSeen: string;
  selectedImage: any;
  topicForm = this.fb.group({
    pageTitle: [''],
    authors: [''],
    keywords: [''],
    description: [''],
    linkUrl: [''],
    linkLabel: [''],
    links: this.fb.group({
      newsLink: [''],
      useAPNewsLink: ['true'],
      addAPNewsContent: [''],
      wikiLink: [''],
      useWikiLink: ['true'],
      addWikiLinkContent: [''],
    }),

    // image one form
    one: this.fb.group({
      title: [''],
      author: [''],
      altText: [''],
      imageSrc: [''],
      srcset: [''],
      description: [''],
      tags: [''],
      source: [''],
    }),

    // image two form
  });
  constructor(
    private store: Store<TrendsState>,
    private trendsService: TrendsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.store.dispatch(TrendsActions.loadTrends({ payload: 'US' }));
    this.trends$ = this.store.pipe(select(trendsQuery.getTrends));
  }

  handleShowForm() {
    // show form
  }

  onSelectedCommonsImage(image: any) {
    console.log('image', image);
    this.selectedImage = image;
  }

  onTrendSeen(trendTitleQuery: string) {
    console.log('trend.title.query', trendTitleQuery);
    this.trendTitleSeen = trendTitleQuery;
    this.getCommonsImages(trendTitleQuery);
  }

  getCommonsImages(trendTitleQuery) {
    this.trendsService.getCommonsImages(trendTitleQuery).subscribe((result) => {
      this.commonImages = result;
    });
  }

  handleBackToList() {
    this.commonImages = null;
    this.trendTitleSeen = null;
    this.trendsListDetail.backToList();
  }

  updateCountry(category: any): void {
    this.store.dispatch(TrendsActions.loadTrends({ payload: category }));
  }

  onUpdateSearchTerm(newSearchTerm: string) {
    console.log('newSearchTerm', newSearchTerm);
    this.getCommonsImages(newSearchTerm);
  }
}
