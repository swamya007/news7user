import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdDailogComponent } from './edit-ad-dailog.component';

describe('EditAdDailogComponent', () => {
  let component: EditAdDailogComponent;
  let fixture: ComponentFixture<EditAdDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
