import {
  Component,
  Input,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ControlContainer,
} from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'demo-app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TopicFormComponent implements AfterViewInit {
  @Input() topicForm: FormGroup;
  @Input() trendTitleSeen: string;
  faTimes = faTimes;
  ngAfterViewInit() {
    this.topicForm.controls.one['controls']?.title?.setValue(
      this.trendTitleSeen
    );
    this.topicForm.controls.two['controls']?.title?.setValue(
      this.trendTitleSeen
    );
  }

  onClose() {
    this.topicForm.removeControl('two');
  }

  /**
   * Set the oneOrTwo type and author.
   * If it's type MASHUP, then we set both one and two properties.
   * @param selection AI, ARTIST, MASHUP 
   * @param oneOrTwo one or two
   */
  onTypeSelectionChange(selection, oneOrTwo) {

    console.log('selection', selection);
    if (oneOrTwo === 'one' && selection === 'MASHUP') {
      this.topicForm.controls['one']['controls']?.type?.setValue(selection);
      this.topicForm.controls['one']['controls']?.author?.setValue(selection);
      this.topicForm.controls?.two['controls']?.type?.setValue(selection);
      this.topicForm.controls?.two['controls']?.author?.setValue(
        selection
      );
    } else {
      this.topicForm.controls[oneOrTwo]['controls']?.type?.setValue(selection);
      this.topicForm.controls[oneOrTwo]['controls']?.author?.setValue(selection);
    }
  }

  /**
   * Probably don't need this as the filed should be applied just having
   * formControlName="googleImg" in the template.
   * @param oneOrTwo
   */
  onUpdatedGoogleImage(oneOrTwo) {
    this.topicForm.controls[oneOrTwo]['controls']?.googleImg?.setValue(
      this.topicForm.value[oneOrTwo].googleImg
    );
  }
}
