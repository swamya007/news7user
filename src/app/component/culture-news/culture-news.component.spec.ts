import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureNewsComponent } from './culture-news.component';

describe('CultureNewsComponent', () => {
  let component: CultureNewsComponent;
  let fixture: ComponentFixture<CultureNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultureNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
