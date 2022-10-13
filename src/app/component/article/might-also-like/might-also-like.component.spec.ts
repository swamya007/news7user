import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MightAlsoLikeComponent } from './might-also-like.component';

describe('MightAlsoLikeComponent', () => {
  let component: MightAlsoLikeComponent;
  let fixture: ComponentFixture<MightAlsoLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MightAlsoLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MightAlsoLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
