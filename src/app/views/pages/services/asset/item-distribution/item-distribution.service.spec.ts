import { TestBed } from '@angular/core/testing';

import { ItemDistributionService } from './item-distribution.service';

describe('ItemDistributionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemDistributionService = TestBed.get(ItemDistributionService);
    expect(service).toBeTruthy();
  });
});
