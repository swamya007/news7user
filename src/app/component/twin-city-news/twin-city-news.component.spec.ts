import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwinCityNewsComponent } from './twin-city-news.component';

describe('TwinCityNewsComponent', () => {
  let component: TwinCityNewsComponent;
  let fixture: ComponentFixture<TwinCityNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwinCityNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwinCityNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
