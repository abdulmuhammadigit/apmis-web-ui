import { TestBed } from '@angular/core/testing';

import { NecessityChartDetailService } from './necessity-chart-detail.service';

describe('NecessityChartDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NecessityChartDetailService = TestBed.get(NecessityChartDetailService);
    expect(service).toBeTruthy();
  });
});
