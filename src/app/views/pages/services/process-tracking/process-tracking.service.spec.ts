import { TestBed } from '@angular/core/testing';

import { ProcessTrackingService } from './process-tracking.service';

describe('ProcessTrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessTrackingService = TestBed.get(ProcessTrackingService);
    expect(service).toBeTruthy();
  });
});
