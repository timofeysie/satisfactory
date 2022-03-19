import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLinksComponent } from './article-list.component';

describe('ArticleListComponent', () => {
  let component: DetailLinksComponent;
  let fixture: ComponentFixture<DetailLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailLinksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
