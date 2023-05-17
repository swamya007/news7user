import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdiaTopstoriesComponent } from './odia-topstories.component';

describe('OdiaTopstoriesComponent', () => {
  let component: OdiaTopstoriesComponent;
  let fixture: ComponentFixture<OdiaTopstoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdiaTopstoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdiaTopstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
