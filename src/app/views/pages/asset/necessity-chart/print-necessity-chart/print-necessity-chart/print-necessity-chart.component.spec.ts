import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintNecessityChartComponent } from './print-necessity-chart.component';

describe('PrintNecessityChartComponent', () => {
  let component: PrintNecessityChartComponent;
  let fixture: ComponentFixture<PrintNecessityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintNecessityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintNecessityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
