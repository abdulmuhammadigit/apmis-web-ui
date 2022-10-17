import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessitychartQuarterReportComponent } from './necessitychart-quarter-report.component';

describe('NecessitychartQuarterReportComponent', () => {
  let component: NecessitychartQuarterReportComponent;
  let fixture: ComponentFixture<NecessitychartQuarterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessitychartQuarterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NecessitychartQuarterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
