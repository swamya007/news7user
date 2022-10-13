import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopeNewsComponent } from './horoscope-news.component';

describe('HoroscopeNewsComponent', () => {
  let component: HoroscopeNewsComponent;
  let fixture: ComponentFixture<HoroscopeNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoroscopeNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoroscopeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
