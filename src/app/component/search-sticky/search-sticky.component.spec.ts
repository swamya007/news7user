import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStickyComponent } from './search-sticky.component';

describe('SearchStickyComponent', () => {
  let component: SearchStickyComponent;
  let fixture: ComponentFixture<SearchStickyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStickyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStickyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
