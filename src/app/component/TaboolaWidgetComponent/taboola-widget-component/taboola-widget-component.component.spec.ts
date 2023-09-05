import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaboolaWidgetComponentComponent } from './taboola-widget-component.component';

describe('TaboolaWidgetComponentComponent', () => {
  let component: TaboolaWidgetComponentComponent;
  let fixture: ComponentFixture<TaboolaWidgetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaboolaWidgetComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaboolaWidgetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
