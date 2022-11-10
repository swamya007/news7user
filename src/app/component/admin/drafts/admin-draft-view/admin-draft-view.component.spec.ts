import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDraftViewComponent } from './admin-draft-view.component';

describe('AdminDraftViewComponent', () => {
  let component: AdminDraftViewComponent;
  let fixture: ComponentFixture<AdminDraftViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDraftViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDraftViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
