import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastLiveComponent } from './broadcast-live.component';

describe('BroadcastLiveComponent', () => {
  let component: BroadcastLiveComponent;
  let fixture: ComponentFixture<BroadcastLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
