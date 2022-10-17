import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityChartReportComponent } from './necessity-chart-report.component';

describe('NecessityChartReportComponent', () => {
  let component: NecessityChartReportComponent;
  let fixture: ComponentFixture<NecessityChartReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityChartReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NecessityChartReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
