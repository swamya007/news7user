import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingnewsComponent } from './trendingnews.component';

describe('TrendingnewsComponent', () => {
  let component: TrendingnewsComponent;
  let fixture: ComponentFixture<TrendingnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingnewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
