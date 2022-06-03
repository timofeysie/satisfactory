import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ControlContainer,
} from '@angular/forms';
import { Selector } from '@demo-app/data-models';

@Component({
  selector: 'demo-app-post-creation-form',
  templateUrl: './post-creation-form.component.html',
  styleUrls: ['./post-creation-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  providers: [FormGroupDirective],
})
export class PostCreationFormComponent {
  @Input() fullTopicForm: FormGroup;
  @Input() trendTitleSeen: string;
  @Input() generatedTextUpdating: boolean;
  @Output() selectedAspect = new EventEmitter<any>();
  @Output() retrieveArticleSummary = new EventEmitter<any>();
  @Output() chooseArticleSummary = new EventEmitter<any>();
  @Output() imageSelected = new EventEmitter<string>();
  @Output() originalImageSelected = new EventEmitter<string>();
  @Output() generatedTextUpdated = new EventEmitter<boolean>();
  @Output() kickoffGenerateImages = new EventEmitter<any>();
  @Output() kickoffGenerateText = new EventEmitter<any>();
  @Output() preFillDescription = new EventEmitter<any>();
  @Output() selectedCategory = new EventEmitter<any>();
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('originalFileInput', { static: false })
  originalFileInput: ElementRef;
  @ViewChild('summaryInput', { static: false }) summaryInput: ElementRef;
  textLines: number;
  topicMetaDescriptionText = '';
  metaDescriptionText1 = '';
  metaDescriptionText2 = '';
  topicMetaDescriptionCharacters: number;
  metaDescriptionCharacters1: number;
  metaDescriptionCharacters2: number;
  selectedValue: string;
  categories: Selector[] = [
    {
      value: 'sports',
      viewValue: 'Sports',
    },
    {
      value: 'Business',
      viewValue: 'Business',
    },
    {
      value: 'Politics',
      viewValue: 'Politics',
    },
    {
      value: 'Entertainment',
      viewValue: 'Entertainment',
    },
    {
      value: 'Tech',
      viewValue: 'Tech',
    },
  ];

  onGeneratedTextUpdate() {
    this.generatedTextUpdated.emit(true);
  }

  onPreFillDescription() {
    this.preFillDescription.emit();
  }

  retrieveSummary() {
    this.retrieveArticleSummary.emit(true);
  }

  onChooseSummary() {
    this.summaryInput.nativeElement.click();
  }

  copyToMetaDescription() {
    this.topicMetaDescriptionText = this.fullTopicForm.controls.description.value;
  }

  onSelectedCategory(event) {
    this.selectedCategory.emit(event);
  }

  calculateLines() {
    const text = this.fullTopicForm.controls.topicText.value;
    this.textLines = text.match(/\n/g).length;
  }

  onTopicMetaDescriptionEvent(event: any) {
    this.topicMetaDescriptionCharacters = event.length;
  }

  onMetaDescriptionEvent1(event: any) {
    this.metaDescriptionCharacters1 = event.length;
  }

  onMetaDescriptionEvent2(event: any) {
    this.metaDescriptionCharacters2 = event.length;
  }

  onAspectSelectionChange(event: any, pictureNumber: string) {
    this.selectedAspect.emit({
      pictureNumber: pictureNumber,
      aspect: event,
    });
  }

  /**
   * This action lets the user choose which image will be uploaded to S3 and
   * attached to the json as a url to that location.
   */
  onUploadImage() {
    this.fileInput.nativeElement.click();
  }

  /**
   * This is used to choose a source image to get meta data from and then let the user
   * choose the different aspect images to be created which should be centered on the subject.
   */
  onChooseSourceImage() {
    this.originalFileInput.nativeElement.click();
  }

  upload(event) {
    if (event.target.files.length > 0) {
      const fileChosen = event.target.files[0]['name'];
      this.imageSelected.emit(fileChosen);
    } else {
      console.error('event.target.files array is empty');
    }
  }

  sourceImageChosen(event) {
    if (event.target.files.length > 0) {
      const fileChosen = event.target.files[0]['name'];
      console.log('fileChose', fileChosen);
      this.originalImageSelected.emit(fileChosen);
    } else {
      console.error('event.target.files array is empty');
    }
  }

  chooseSummary(event) {
    if (event.target.files.length > 0) {
      const fileChosen = event.target.files[0]['name'];
      this.chooseArticleSummary.emit(fileChosen);
    } else {
      console.error('event.target.files array is empty');
    }
  }

  kickoffGenerate() {
    this.kickoffGenerateImages.emit();
  }

  kickoffGeneratedTextUpdate() {
    this.kickoffGenerateText.emit();
  }
}
