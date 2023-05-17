import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHomepageComponent } from './single-homepage.component';

describe('SingleHomepageComponent', () => {
  let component: SingleHomepageComponent;
  let fixture: ComponentFixture<SingleHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
