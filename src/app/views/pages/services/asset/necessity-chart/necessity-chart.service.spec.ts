import { TestBed } from '@angular/core/testing';

import { NecessityChartService } from './necessity-chart.service';

describe('NecessityChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NecessityChartService = TestBed.get(NecessityChartService);
    expect(service).toBeTruthy();
  });
});
