import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationNewsComponent } from './education-news.component';

describe('EducationNewsComponent', () => {
  let component: EducationNewsComponent;
  let fixture: ComponentFixture<EducationNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
