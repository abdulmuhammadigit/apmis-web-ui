import { TestBed } from '@angular/core/testing';

import { ItemDistributionDetailService } from './item-distribution-detail.service';

describe('ItemDistributionDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemDistributionDetailService = TestBed.get(ItemDistributionDetailService);
    expect(service).toBeTruthy();
  });
});
