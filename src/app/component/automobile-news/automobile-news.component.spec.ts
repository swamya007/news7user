import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobileNewsComponent } from './automobile-news.component';

describe('AutomobileNewsComponent', () => {
  let component: AutomobileNewsComponent;
  let fixture: ComponentFixture<AutomobileNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomobileNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobileNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
