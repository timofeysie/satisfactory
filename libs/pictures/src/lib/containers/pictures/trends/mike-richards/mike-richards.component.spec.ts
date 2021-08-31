import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MikeRichardsComponent } from './mike-richards.component';

describe('MikeRichardsComponent', () => {
  let component: MikeRichardsComponent;
  let fixture: ComponentFixture<MikeRichardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MikeRichardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MikeRichardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
