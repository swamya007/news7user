import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPostDraftComponent } from './admin-edit-post-draft.component';

describe('AdminEditPostDraftComponent', () => {
  let component: AdminEditPostDraftComponent;
  let fixture: ComponentFixture<AdminEditPostDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditPostDraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditPostDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
