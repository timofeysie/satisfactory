import { Component, Input, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ControlContainer,
} from '@angular/forms';

@Component({
  selector: 'demo-app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class TopicFormComponent implements AfterViewInit {
  @Input() topicForm: FormGroup;
  @Input() trendTitleSeen: string;

  ngAfterViewInit() {
    this.topicForm.controls.one['controls']?.title?.setValue(
      this.trendTitleSeen
    );
    this.topicForm.controls.two['controls']?.title?.setValue(
      this.trendTitleSeen
    );
  }

  onTypeSelectionChange(selection, oneOrTwo) {
    this.topicForm.controls[oneOrTwo]['controls']?.type?.setValue(selection);
    this.topicForm.controls[oneOrTwo]['controls']?.author?.setValue(selection);
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
