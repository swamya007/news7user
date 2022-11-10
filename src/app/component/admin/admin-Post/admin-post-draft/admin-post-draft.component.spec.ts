import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostDraftComponent } from './admin-post-draft.component';

describe('AdminPostDraftComponent', () => {
  let component: AdminPostDraftComponent;
  let fixture: ComponentFixture<AdminPostDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostDraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
