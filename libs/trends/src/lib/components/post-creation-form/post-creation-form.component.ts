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
  @Output() selectedAspect = new EventEmitter<any>();
  @Output() retrieveArticleSummary = new EventEmitter<any>();
  @Output() imageSelected = new EventEmitter<string>();
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  textLines: number;
  topicMetaDescriptionText = '';
  metaDescriptionText1 = '';
  metaDescriptionText2 = '';
  topicMetaDescriptionCharacters: number;
  metaDescriptionCharacters1: number;
  metaDescriptionCharacters2: number;

  retrieveSummary() {
    this.retrieveArticleSummary.emit(true);
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

  onUploadImage() {
    this.fileInput.nativeElement.click();
  }

  upload(event) {
    console.log('event');
    const fileChosen = event.target.files[0]['name'];
    this.imageSelected.emit(fileChosen);
  }
}
