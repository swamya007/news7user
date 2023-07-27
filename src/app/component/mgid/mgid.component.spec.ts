import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgidComponent } from './mgid.component';

describe('MgidComponent', () => {
  let component: MgidComponent;
  let fixture: ComponentFixture<MgidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MgidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MgidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
