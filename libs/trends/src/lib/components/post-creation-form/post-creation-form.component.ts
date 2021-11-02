import { Component, Input } from '@angular/core';
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
}
