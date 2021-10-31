import { Component, Input } from '@angular/core';
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
export class TopicFormComponent {
  @Input() topicForm: FormGroup;

  onSelectionChange(selection) {
    console.log('selection', selection);
    this.topicForm.controls.one['controls']?.type?.setValue(selection);
  }

  onUpdatedGoogleImage(selection) {
    console.log('selection', selection);
    this.topicForm.controls.one['controls']?.googleImg?.setValue(selection);
  }
}
