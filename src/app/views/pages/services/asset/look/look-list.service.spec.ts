import { TestBed } from '@angular/core/testing';

import { LookListService } from './look-list.service';

describe('LookListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LookListService = TestBed.get(LookListService);
    expect(service).toBeTruthy();
  });
});
