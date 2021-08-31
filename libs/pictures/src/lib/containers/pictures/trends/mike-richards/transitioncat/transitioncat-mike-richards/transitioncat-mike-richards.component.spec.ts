import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitioncatMikeRichardsComponent } from './transitioncat-mike-richards.component';

describe('TransitioncatMikeRichardsComponent', () => {
  let component: TransitioncatMikeRichardsComponent;
  let fixture: ComponentFixture<TransitioncatMikeRichardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitioncatMikeRichardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitioncatMikeRichardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
