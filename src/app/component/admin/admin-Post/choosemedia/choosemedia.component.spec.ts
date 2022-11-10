import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosemediaComponent } from './choosemedia.component';

describe('ChoosemediaComponent', () => {
  let component: ChoosemediaComponent;
  let fixture: ComponentFixture<ChoosemediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosemediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosemediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
