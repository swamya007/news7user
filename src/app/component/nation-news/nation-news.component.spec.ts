import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationNewsComponent } from './nation-news.component';

describe('NationNewsComponent', () => {
  let component: NationNewsComponent;
  let fixture: ComponentFixture<NationNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
