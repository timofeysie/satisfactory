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
  trendTitleSeenBackup: string; // this is a code smell!
  completePostMode = false;
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
      author: ['AI'],
      altText: [''],
      imageSrc: [''],
      srcset: [''],
      description: [''],
      tags: [''],
      source: [''],

      type: ['AI'],
      commonImg: [''],
      googleImg: [''],
    }),

    // image two form
    two: this.fb.group({
      title: [''],
      author: ['ARTIST'],
      altText: [''],
      imageSrc: [''],
      srcset: [''],
      description: [''],
      tags: [''],
      source: [''],

      type: ['ARTIST'],
      commonImg: [''],
      googleImg: [''],
    }),
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

  onHandleShowForm() {
    this.completePostMode = true;
    this.trendTitleSeenBackup = this.trendTitleSeen;
  }

  onHandleBackToSetup() {
    this.completePostMode = false;
    this.trendTitleSeen = this.trendTitleSeenBackup;
  }

  onSelectedCommonsImage(image: any) {
    this.topicForm.controls.one['controls']?.commonImg?.setValue(image);
    console.log('image', this.topicForm.controls.one['controls'].commonImg);
    this.topicForm.value.one.commonImg;
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

  onHandleBackToList() {
    this.commonImages = null;
    this.trendTitleSeen = null;
    if (this.trendsListDetail) {
      this.trendsListDetail.backToList();
    }
  }

  updateCountry(category: any): void {
    this.store.dispatch(TrendsActions.loadTrends({ payload: category }));
  }

  onUpdateSearchTerm(newSearchTerm: string) {
    console.log('newSearchTerm', newSearchTerm);
    this.getCommonsImages(newSearchTerm);
  }
}
