import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DharmaComponent } from './dharma.component';

describe('DharmaComponent', () => {
  let component: DharmaComponent;
  let fixture: ComponentFixture<DharmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DharmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
