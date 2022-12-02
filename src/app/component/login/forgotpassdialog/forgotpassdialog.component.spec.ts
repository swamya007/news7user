import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpassdialogComponent } from './forgotpassdialog.component';

describe('ForgotpassdialogComponent', () => {
  let component: ForgotpassdialogComponent;
  let fixture: ComponentFixture<ForgotpassdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpassdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpassdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
