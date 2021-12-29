import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'demo-app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss'],
})
export class DetailFormComponent implements OnInit {
  @Input() selectedProductData: string;
  @Output() save = new EventEmitter<boolean>();
  productForm = this.fb.group({
    data: [''],
  });
  faSave = faSave;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const parseJSON = JSON.parse(JSON.stringify(this.selectedProductData));
    const JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
    this.productForm.controls.data.setValue(JSONInPrettyFormat);
  }

  onSave() {
    this.save.emit(true)
  }
}
