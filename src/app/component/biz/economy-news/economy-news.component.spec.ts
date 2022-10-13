import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyNewsComponent } from './economy-news.component';

describe('EconomyNewsComponent', () => {
  let component: EconomyNewsComponent;
  let fixture: ComponentFixture<EconomyNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EconomyNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
