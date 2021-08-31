import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToonifyMikeRichardsComponent } from './toonify-mike-richards.component';

describe('ToonifyMikeRichardsComponent', () => {
  let component: ToonifyMikeRichardsComponent;
  let fixture: ComponentFixture<ToonifyMikeRichardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToonifyMikeRichardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToonifyMikeRichardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
