import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsToolbarComponent } from './trends-toolbar.component';

describe('TrendsToolbarComponent', () => {
  let component: TrendsToolbarComponent;
  let fixture: ComponentFixture<TrendsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendsToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
