import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsLinksComponent } from './trends-links.component';

describe('TrendsLinksComponent', () => {
  let component: TrendsLinksComponent;
  let fixture: ComponentFixture<TrendsLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendsLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
