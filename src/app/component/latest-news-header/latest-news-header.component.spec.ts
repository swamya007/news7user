import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsHeaderComponent } from './latest-news-header.component';

describe('LatestNewsHeaderComponent', () => {
  let component: LatestNewsHeaderComponent;
  let fixture: ComponentFixture<LatestNewsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestNewsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
