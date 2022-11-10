import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsMangementComponent } from './comments-mangement.component';

describe('CommentsMangementComponent', () => {
  let component: CommentsMangementComponent;
  let fixture: ComponentFixture<CommentsMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsMangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
