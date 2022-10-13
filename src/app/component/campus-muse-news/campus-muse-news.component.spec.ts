import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusMuseNewsComponent } from './campus-muse-news.component';

describe('CampusMuseNewsComponent', () => {
  let component: CampusMuseNewsComponent;
  let fixture: ComponentFixture<CampusMuseNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusMuseNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusMuseNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
