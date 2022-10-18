import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyNewsComponent } from './biography-news.component';

describe('BiographyNewsComponent', () => {
  let component: BiographyNewsComponent;
  let fixture: ComponentFixture<BiographyNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiographyNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiographyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
