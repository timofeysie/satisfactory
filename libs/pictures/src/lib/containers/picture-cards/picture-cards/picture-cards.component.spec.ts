import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCardsComponent } from './picture-cards.component';

describe('PictureCardsComponent', () => {
  let component: PictureCardsComponent;
  let fixture: ComponentFixture<PictureCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
