import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtagscomponentComponent } from './searchtagscomponent.component';

describe('SearchtagscomponentComponent', () => {
  let component: SearchtagscomponentComponent;
  let fixture: ComponentFixture<SearchtagscomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchtagscomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtagscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
