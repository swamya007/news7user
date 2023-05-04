import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesearchComponent } from './singlesearch.component';

describe('SinglesearchComponent', () => {
  let component: SinglesearchComponent;
  let fixture: ComponentFixture<SinglesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglesearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
