import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendyLayoutComponent } from './trendy-layout.component';

describe('TrendyLayoutComponent', () => {
  let component: TrendyLayoutComponent;
  let fixture: ComponentFixture<TrendyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendyLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
