import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonImagesComponent } from './common-images.component';

describe('CommonImagesComponent', () => {
  let component: CommonImagesComponent;
  let fixture: ComponentFixture<CommonImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
