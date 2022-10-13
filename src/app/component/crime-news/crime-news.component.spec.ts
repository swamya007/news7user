import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeNewsComponent } from './crime-news.component';

describe('CrimeNewsComponent', () => {
  let component: CrimeNewsComponent;
  let fixture: ComponentFixture<CrimeNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrimeNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
