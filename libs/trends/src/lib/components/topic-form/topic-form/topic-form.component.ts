import { Component, OnInit, Input } from '@angular/core';
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
export class TopicFormComponent implements OnInit {
  @Input() topicForm: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
