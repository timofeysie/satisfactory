import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsListComponent } from './trends-list.component';

describe('TrendsListComponent', () => {
  let component: TrendsListComponent;
  let fixture: ComponentFixture<TrendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
