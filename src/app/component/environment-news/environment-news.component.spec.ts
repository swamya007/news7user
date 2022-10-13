import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentNewsComponent } from './environment-news.component';

describe('EnvironmentNewsComponent', () => {
  let component: EnvironmentNewsComponent;
  let fixture: ComponentFixture<EnvironmentNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
