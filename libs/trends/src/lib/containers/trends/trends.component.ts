import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TrendsState } from './../../+state/trends.reducer';
import { Store, select } from '@ngrx/store';
import { trendsQuery } from './../../+state/trends.selectors';
import { Observable, throwError } from 'rxjs';
import { Trend } from '@demo-app/data-models';
import * as TrendsActions from '../../+state/trends.actions';
import { TrendsService } from '../../services/trends/trends.service';
import { TrendsListComponent } from '../trends-list/trends-list.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
  newWikiSearchTerm: string;
  newAPSearchTerm: string;
  countryListUsed: string;
  imageChosen: string;
  topicForm = this.fb.group({
    date: [''],
    country: [''],
    pageTitle: [''],
    authors: [''],
    keywords: [''],
    description: [''],
    metaDescription: [''],
    linkUrl: [''],
    linkLabel: [''],
    linkForSummary: [''],
    links: this.fb.group({
      newsLink: [''],
      newsLinkLabel: [''],
      useAPNewsLink: [''],
      addAPNewsContent: [''],
      wikiLink: [''],
      useWikiLink: ['true'],
      addWikiLinkContent: [''],
    }),

    // text for description generation
    topicText: [''],

    // image one form
    one: this.fb.group({
      title: [''],
      author: ['AI'],
      altText: [''],
      imageSrc: [''],
      imageChosen: [''],
      srcset: [''],
      description: [''],
      metaDescription: [''],
      tags: [''],
      source: [''],
      aspect: [''],

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
      imageChosen: [''],
      srcset: [''],
      description: [''],
      metaDescription: [''],
      tags: [''],
      source: [''],
      aspect: [''],

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

  /**
   * As a result of difficulties reading an array from a file and getting
   * the json summary_text, we do it manually here.
   * Special characters are converted and spaces before the period created
   * by BART are removed.
   */
  onRetrieveArticleSummary() {
    const linkForSummary = this.topicForm.controls.linkForSummary.value;
    this.trendsService
      .retrieveArticleSummaryById(linkForSummary)
      .subscribe((result) => {
        const fullResponse = JSON.parse(JSON.stringify(result));
        let start = fullResponse.indexOf('" ');
        let offset = 2;
        if (start === -1) {
          start = fullResponse.indexOf("summary_text': '");
          offset = 17;
        }
        const text = fullResponse.substring(
          start + offset,
          fullResponse.length - 5
        );
        const text1 = text.split('�').join("'");
        const text2 = text1.split(' .').join('.');
        this.topicForm.controls.description.setValue(text2);
      });
  }

  handleOnUseLinkForSummary(event) {
    this.topicForm.controls.linkForSummary.setValue(event);
  }

  onTrendSeen(trend: any) {
    this.trendTitleSeen = trend.title.query;
    this.newWikiSearchTerm = this.trendTitleSeen;
    this.trendDetails = trend;
    this.completePostMode = false;
    this.getCommonsImages(this.trendTitleSeen);
    this.captureTrendDetailsText(trend.articles);
    this.fillLinks();
  }

  onHandleShowForm() {
    this.preFillForm();
  }

  onHandleSubmitForm() {
    const formValue = this.topicForm.value;
    formValue['originalTrend'] = this.trendDetails;
    console.log('formValue', formValue);
    this.trendsService.postTrendTopic(formValue).subscribe();
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

  onHandleNewWikiSearchTerm(newValue: string) {
    this.newWikiSearchTerm = newValue;
  }

  onHandleNewAPSearchTerm(newValue: string) {
    this.newAPSearchTerm = newValue;
    this.topicForm.controls.links['controls']?.newsLink?.setValue(newValue);
  }

  /**
   * The user is shown a file chooser to select the generated image.
   * Currently there is no notion of ONE or TWO here.
   * @param selectedImage selected generated image
   */
  onImageSelected(selectedImage: string) {
    this.trendsService
      .uploadSelectedImage(selectedImage)
      .subscribe((result) => {
        console.log('onImageSelected result', result);
        this.imageChosen = selectedImage;
        if (this.topicForm.value.one.type === 'AI') {
          this.topicForm.controls['one']['controls']?.imageChosen?.setValue(
            selectedImage
          );
        }
        if (this.topicForm.value.two.type === 'AI') {
          this.topicForm.controls['two']['controls']?.imageChosen?.setValue(
            selectedImage
          );
        }
      });
  }

  /**
   * For this we loop through the selected json and add each of these to a text field:
   * ```txt
   * snippet: "The rapper says he is &quot;absolutely devastated&quot; by the deaths that occurred at his Astroworld festival."
   * source: "BBC News"
   * title: "Travis Scott &#39;devastated&#39; by Texas festival deaths"
   * ```
   * Probably don't need the source.
   */
  captureTrendDetailsText(text) {
    let capturedText = '';
    text.forEach((item) => {
      capturedText = capturedText + item.title + '\n';
      capturedText = capturedText + item.snippet + '\n';
    });
    this.topicForm.controls.topicText.setValue(this.decode(capturedText));
  }

  decode(input) {
    const txt = document.createElement('textarea');
    txt.innerHTML = input;
    const temp = txt.value.replace('<i>', '');
    const output = temp.replace('</i>', '');
    return output;
  }

  /**
   * TODO: summarize source data and how it's used to pre-fill the other
   * form fields.
   */
  preFillForm() {
    this.setDateAndCountry();
    // kick off the article scape and summary on the backend
    if (this.topicForm.controls.linkForSummary.value) {
      this.kickOffGetArticleSummary();
    }
    // download images
    this.downloadImages();
    // set the page title
    this.topicForm.controls.pageTitle.setValue(this.trendTitleSeen);
    // create TODO <AI>, <ARTIST> author values
    this.createAuthorValues();
    this.fillLinks();
    this.setAIorArtistPictureData();
    this.getRelatedQueries();
  }

  setDateAndCountry() {
    const date = new Date();
    this.topicForm.controls.date.setValue(date.toString());
    this.topicForm.controls.country.setValue(this.countryListUsed);
  }

  /**
   * Call the appropriate functions to set up data such as:
   * aspect
   * commonsImgSource
   * altTagText
   */
  setAIorArtistPictureData() {
    if (this.topicForm.value.one.type === 'AI') {
      this.setAIPictureNumberData('one');
    } else {
      this.setArtistPictureNumberData('one');
    }
    if (this.topicForm.value.two.type === 'AI') {
      this.setAIPictureNumberData('two');
    } else {
      this.setArtistPictureNumberData('two');
    }
  }

  /**
   * Get img urls to send to the backend for download.
   */
  downloadImages() {
    const urls = [];
    const one = this.getCommonsImageUrl('one');
    const two = this.getCommonsImageUrl('two');
    if (one) urls.push(one);
    if (two) urls.push(two);
    if (urls.length > 0) {
      this.trendsService.downloadImages(urls).subscribe();
    }
  }

  /**
   * Find the full sized image by getting the src and removing the \thumb section.
   * @param pictureNumber
   * @returns url of full sized image
   */
  getCommonsImageUrl(pictureNumber: string) {
    const urlPage = this.topicForm.controls[pictureNumber]['controls'].commonImg
      .value;
    if (urlPage) {
      const dataSet = 'src="';
      const ext = this.findExtension(urlPage);
      const start = urlPage.indexOf(dataSet);
      const urlStart = urlPage.substring(
        start + dataSet.length,
        urlPage.length
      );

      const end = urlStart.indexOf(ext);
      const urlFull = urlStart.substring(0, end + ext.length);
      const woThumb = urlFull.replace('/thumb', '');
      return woThumb;
    }
  }

  /**
   * looks for the third dot in the img tag string and
   * returns that with the dot, such as '.jpg' or '.png'.
   * This is a pretty weak function with two separate ways of getting the extension.
   * The first method goes through the dots and gets the third dot and assumes that's it.
   * The next method was needed for situations that returned a url like this:
   * links https://upload.wikimedia.org/wikipedia/commons/1/1d/Chuck_Liddell_vs._Ri
   * That would be for this commons page.
   * The full res version is:
   * https://upload.wikimedia.org/wikipedia/commons/1/1d/Chuck_Liddell_vs._Rich_Franklin_UFC_115.jpg
   * @param urlPage
   * @returns first file extension found
   */
  findExtension(urlPage) {
    const jpg = '.jpg';
    const png = '.png';
    const firstDot = urlPage.indexOf('.');
    const afterFirstDot = urlPage.substring(firstDot + 1, urlPage.length);
    const secondDot = afterFirstDot.indexOf('.');
    const afterSecondDot = afterFirstDot.substring(
      secondDot + 1,
      afterFirstDot.lenth
    );
    const thirdDot = afterSecondDot.indexOf('.');
    const ext = afterSecondDot.substring(thirdDot, thirdDot + 4);
    if (ext.toLowerCase() === jpg || ext.toLowerCase() === png) {
      return ext;
    } else {
      const pngPlace = afterFirstDot.toLowerCase().indexOf(png);
      const jpgPlace = afterFirstDot.toLowerCase().indexOf(jpg);
      if (pngPlace !== -1) {
        return png;
      }
      if (jpgPlace !== -1) {
        return jpg;
      }
    }
  }

  kickOffGetArticleSummary() {
    this.trendsService
      .kickoffArticleSummary(this.topicForm.controls.linkForSummary.value)
      .pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            console.log(`kickOffGetArticleSummary 1-Error: ${error}`);
          } else {
            console.log(
              `kickOffGetArticleSummary 2-Error: ${error?.error?.error}`
            );
          }
          return of('done with kickOffGetArticleSummary');
        })
      )
      .subscribe((result) => {
        console.log('kickOffGetArticleSummary result', result);
      });
  }

  // create TODO <AI>, <ARTIST> author values
  createAuthorValues() {
    const authors =
      '<' +
      this.topicForm.controls['one']['controls']?.author?.value +
      '>, ' +
      '<' +
      this.topicForm.controls['two']['controls']?.author?.value +
      '>';
    this.topicForm.controls.authors.setValue(authors);
  }

  /**
   * Create link and label for Wikipedia.
   * https://en.wikipedia.org/wiki/{{ newWikiSearchTerm }}
   */
  fillLinks() {
    if (this.topicForm.value.links.useWikiLink === 'true') {
      this.topicForm.controls.linkUrl.setValue(
        'https://en.wikipedia.org/wiki/' + this.newWikiSearchTerm
      );
      this.topicForm.controls.linkLabel.setValue(
        this.trendTitleSeen + ' on Wikipedia'
      );
    }

    if (
      this.topicForm.controls.links['controls']?.useAPNewsLink.value === true
    ) {
      this.topicForm.controls.links['controls'].newsLink.setValue(
        'https://en.wikipedia.org/wiki/' + this.newAPSearchTerm
      );
      this.topicForm.controls.links['controls'].newsLinkLabel.setValue(
        this.trendTitleSeen + ' on AP News'
      );
    }
  }

  /**
   * If the type of picture for one or two is AI, then the source should
   * be a link to the Wikipedia Commons which are under a free to use and modify license.
   * If the type is artist, then there should be another method for setting the source,
   * such as let the artist plug their own site or Instagram account, bio or something.
   */
  setAIPictureNumberData(pictureNumber: string) {
    const commonsImgSource = this.getCommonsImgSource(pictureNumber);
    const aspect = this.getCommonsImgAspect(pictureNumber);
    const altTagText = this.getCommonsImgAlt(pictureNumber);
    const srcset = this.createSrcSet(this.trendTitleSeen, pictureNumber);
    const altTagWithoutExt = this.removeFileExt(altTagText);
    const tags = this.trendTitleSeen + ', ' + altTagWithoutExt;
    this.topicForm.controls[pictureNumber]['controls']?.aspect?.setValue(
      aspect
    );
    this.topicForm.controls[pictureNumber]['controls']?.source?.setValue(
      commonsImgSource
    );
    this.topicForm.controls[pictureNumber]['controls']?.altText?.setValue(
      altTagText
    );
    // might be needed later when AI images have more than one size
    // this.topicForm.controls[pictureNumber]['controls']?.srcset?.setValue(
    //   srcset
    // );
    // const srcset = srcset1.split(' ').join('_'); ???
    this.topicForm.controls[pictureNumber]['controls']?.tags?.setValue(tags);
  }

  setArtistPictureNumberData(pictureNumber: string) {
    const srcset1 = this.createSrcSet(this.trendTitleSeen, pictureNumber);
    const srcset = srcset1.split(' ').join('_');
    this.topicForm.controls[pictureNumber]['controls']?.srcset?.setValue(
      srcset
    );
  }

  removeFileExt(text: string) {
    const dot = text.lastIndexOf('.');
    const newText = text.substring(0, dot);
    return newText;
  }

  createSrcSet(title: string, author: string) {
    return `./../assets/pictures/${title}/${title} by ${author}_300w.jpg,
./../assets/pictures/${title}/${title} by $author}_600w.jpg
./../assets/pictures/${title}/${title} by ${author}_1800w.jpg`;
  }

  /**
   *
   * The Commons image looks like this:
   *```json
   * "commonImg":"<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Harrison_Barnes_Klay_Thompson.jpg/240px-Harrison_Barnes_Klay_Thompson.jpg\" data-src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Harrison_Barnes_Klay_Thompson.jpg/240px-Harrison_Barnes_Klay_Thompson.jpg\"
   *  alt=\"Harrison Barnes Klay Thompson.jpg\" loading=\"lazy\" class=\"sd-image\" style=\"height: 100% !important; max-width: 4320px !important; max-height: 3240px;\">",
   *```
   *We want this from the above:
   *https://commons.wikimedia.org/wiki/File:Harrison_Barnes_Klay_Thompson.jpg
   *Find the .jpg file ending, and work backwards until the last /.
   *The base url is this: "https://commons.wikimedia.org/wiki/File:"
   */
  getCommonsImgSource(pictureNumber: string) {
    const commonImg: string = this.topicForm.controls[pictureNumber]['controls']
      .commonImg.value;
    const fileExt = commonImg.indexOf('.jpg');
    const upTo = commonImg.substring(0, fileExt + 4);
    const start = upTo.lastIndexOf('/');
    const baseUrl = 'https://commons.wikimedia.org/wiki/File:';
    const source = upTo.substring(start + 1, upTo.length);
    return baseUrl + source;
  }

  /**
   * Look for style=\"height: 100% !important; max-width: 4320px !important;
   * max-height: 3240px;\"
   * If type = AI and max-width > max-height, then aspect = landscape, else portrait.
   * @param pictureNumber
   * @returns portrait | landscape
   */
  getCommonsImgAspect(pictureNumber: string) {
    const type: string = this.topicForm.controls[pictureNumber]['controls'].type
      .value;
    if (type === 'AI') {
      const commonImg: string = this.topicForm.controls[pictureNumber][
        'controls'
      ].commonImg.value;
      const maxWidthSearchString = 'max-width: ';
      const maxWidth = commonImg.indexOf(maxWidthSearchString);
      const importantWidth = commonImg.indexOf('!important', maxWidth);
      const width = commonImg.substring(
        maxWidth + maxWidthSearchString.length,
        importantWidth - 3
      ); // -3 to remove the px part

      const maxHeightSearchString = 'max-height: ';
      const maxHeight = commonImg.indexOf(maxHeightSearchString);
      const colonHeight = commonImg.indexOf('px;', maxHeight);
      const height = commonImg.substring(
        maxHeight + maxHeightSearchString.length,
        colonHeight
      );
      return parseInt(width) > parseInt(height) ? 'landscape' : 'portrait';
    } else {
      return 'portrait';
    }
  }

  /**
   *   The alt can be captured as part of this function.
   *  alt=\"Harrison Barnes Klay Thompson.jpg\"
   */
  getCommonsImgAlt(type: string) {
    const commonImg: string = this.topicForm.controls[type]['controls']
      .commonImg.value;
    const altTagStart = commonImg.indexOf('alt');
    const secondPart = commonImg.substring(altTagStart + 5, commonImg.length);
    const altTagEnd = secondPart.indexOf('"');
    const altTag = secondPart.substring(0, altTagEnd);
    return altTag;
  }

  /** Sort through the list and find the item who's title matches the trendTitleSeen
   * and collect the query values from the array there.
   */
  getRelatedQueries() {
    this.trends$.subscribe((results) => {
      const queries = [this.trendTitleSeen];
      results.forEach((result) => {
        if (result.title.query === this.trendTitleSeen) {
          result.relatedQueries.forEach((item) => {
            // get all relatedQueries.query strings
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
    this.countryListUsed = category;
  }

  onUpdateSearchTerm(newSearchTerm: string) {
    this.commonImages = null;
    this.getCommonsImages(newSearchTerm);
  }

  /**
   *
   * @param event pictureNumber: one | two, aspect: portrait | landscape
   */
  onSelectedAspect(event) {
    this.topicForm.controls[event.pictureNumber]['controls']?.aspect?.setValue(
      event.aspect
    );
  }
}
