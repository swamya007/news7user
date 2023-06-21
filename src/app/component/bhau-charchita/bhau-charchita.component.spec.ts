import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhauCharchitaComponent } from './bhau-charchita.component';

describe('BhauCharchitaComponent', () => {
  let component: BhauCharchitaComponent;
  let fixture: ComponentFixture<BhauCharchitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhauCharchitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhauCharchitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
