import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdishaNewsComponent } from './odisha-news.component';

describe('OdishaNewsComponent', () => {
  let component: OdishaNewsComponent;
  let fixture: ComponentFixture<OdishaNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdishaNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdishaNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
