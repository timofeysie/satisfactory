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
  trendDetails: any; // holds the trend selected part of trends$
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
      useAPNewsLink: [''],
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

  onTrendSeen(trend: any) {
    this.trendTitleSeen = trend.title.query;
    console.log('trend selected', trend);
    this.trendDetails = trend;
    this.completePostMode = false;
    this.getCommonsImages(this.trendTitleSeen);
  }

  onHandleShowForm() {
    this.preFillForm();
  }

  onHandleSubmitForm() {
    // to implement
  }

  onHandleBackToSetup() {
    this.completePostMode = false;
    this.trendTitleSeen = this.trendTitleSeenBackup;
  }

  onHandleBackToList() {
    this.commonImages = null;
    this.trendTitleSeen = null;
    this.trendDetails = null;
  }

  onSelectedCommonsImage(image: any) {
    this.topicForm.controls.one['controls']?.commonImg?.setValue(image);
  }

  /**

    this.fb.group({ newsLink: [''], useAPNewsLink: ['true'],
addAPNewsContent: [''], wikiLink: [''], useWikiLink: ['true'],
addWikiLinkContent: [''], }), // image one form one: this.fb.group({ title:
[''], author: ['AI'], altText: [''], imageSrc: [''], srcset: [''], description:
[''], tags: [''], source: [''], type: ['AI'], commonImg: [''], googleImg: [''],
   */
  preFillForm() {
    this.topicForm.controls.pageTitle.setValue(this.trendTitleSeen);
    const authors =
      '<' +
      this.topicForm.controls['one']['controls']?.author?.value +
      '>, ' +
      '<' +
      this.topicForm.controls['two']['controls']?.author?.value +
      '>';
    this.topicForm.controls.authors.setValue(authors);
    
    this.setPictureSource();
    this.getRelatedQueries();
  }

  /**
   * If the type of picture for one or two is AI, then the source should
   * be a link to the Wikipedia Commons which are under a free to use and modify license.
   * If the type is artist, then there should be another method for setting the source,
   * such as let the artist plug their own site or Instagram account, bio or something.
   */
  setPictureSource() {
    if (this.topicForm.value.one.type === 'AI') {
      const commonsImgSourceOne = this.getCommonsImgSource('one');
      this.topicForm.controls.one['controls']?.source?.setValue(
        commonsImgSourceOne
      );
    }
    if (this.topicForm.value.two.type === 'AI') {
      const commonsImgSourceTwo = this.getCommonsImgSource('two');
      this.topicForm.controls.two['controls']?.source?.setValue(
        commonsImgSourceTwo
      );
    }
  }

  /**
   *
   * The Commons image looks like this:
   *```json
   * "commonImg":"<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Harrison_Barnes_Klay_Thompson.jpg/240px-Harrison_Barnes_Klay_Thompson.jpg\" data-src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Harrison_Barnes_Klay_Thompson.jpg/240px-Harrison_Barnes_Klay_Thompson.jpg\" alt=\"Harrison Barnes Klay Thompson.jpg\" loading=\"lazy\" class=\"sd-image\" style=\"height: 100% !important; max-width: 4320px !important; max-height: 3240px;\">",
   *```
   *We want this from the above:
   *https://commons.wikimedia.org/wiki/File:Harrison_Barnes_Klay_Thompson.jpg
   *Find the .jpg file ending, and work backwards until the last /.
   *The base url is this: "https://commons.wikimedia.org/wiki/File:"
   */
  getCommonsImgSource(type: string) {
    const commonImg: string = this.topicForm.controls.one['controls'].commonImg.value;
    const fileExt = commonImg.indexOf('.jpg');
    const upTo = commonImg.substring(0, fileExt + 4);
    const start = upTo.lastIndexOf('/');
    const baseUrl = 'https://commons.wikimedia.org/wiki/File:';
    const source = upTo.substring(start + 1, upTo.length);
    this.topicForm.controls[type]['controls'].source.setValue(source);
    return baseUrl + source;
  }

  /** Sort through the list and find the item who's title matches the trendTitleSeen
   * and collect the query values from the array there.
   */
  getRelatedQueries() {
    this.trends$.subscribe((results) => {
      const queries = [this.trendTitleSeen];
      results.forEach((result) => {
        if (result.title.query === this.trendTitleSeen) {
          console.log('found', result);
          result.relatedQueries.forEach((item) => {
            // get all relatedQueries.query strings
            console.log('add keyword', item.query);
            queries.push(item.query);
          });
        }
      });
      this.topicForm.controls.keywords.setValue(queries.toString());
      this.trendTitleSeenBackup = this.trendTitleSeen;
      this.completePostMode = true;
      return queries;
    });
  }

  getCommonsImages(trendTitleQuery) {
    this.trendsService.getCommonsImages(trendTitleQuery).subscribe((result) => {
      this.commonImages = result;
    });
  }

  updateCountry(category: any): void {
    this.store.dispatch(TrendsActions.loadTrends({ payload: category }));
  }

  onUpdateSearchTerm(newSearchTerm: string) {
    this.getCommonsImages(newSearchTerm);
  }
}
