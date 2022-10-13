import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenNewsComponent } from './women-news.component';

describe('WomenNewsComponent', () => {
  let component: WomenNewsComponent;
  let fixture: ComponentFixture<WomenNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomenNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
