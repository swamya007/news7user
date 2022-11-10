import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDraftEditComponent } from './admin-draft-edit.component';

describe('AdminDraftEditComponent', () => {
  let component: AdminDraftEditComponent;
  let fixture: ComponentFixture<AdminDraftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDraftEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDraftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
