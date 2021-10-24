import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsListDetailComponent } from './trends-list-detail.component';

describe('TrendsListDetailComponent', () => {
  let component: TrendsListDetailComponent;
  let fixture: ComponentFixture<TrendsListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendsListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
