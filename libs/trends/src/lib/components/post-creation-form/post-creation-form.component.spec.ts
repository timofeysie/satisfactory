import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreationFormComponent } from './post-creation-form.component';

describe('PostCreationFormComponent', () => {
  let component: PostCreationFormComponent;
  let fixture: ComponentFixture<PostCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
