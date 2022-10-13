import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewNewsComponent } from './interview-news.component';

describe('InterviewNewsComponent', () => {
  let component: InterviewNewsComponent;
  let fixture: ComponentFixture<InterviewNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
