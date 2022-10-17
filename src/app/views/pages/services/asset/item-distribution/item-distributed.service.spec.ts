import { TestBed } from '@angular/core/testing';

import { ItemDistributedService } from './item-distributed.service';

describe('ItemDistributedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemDistributedService = TestBed.get(ItemDistributedService);
    expect(service).toBeTruthy();
  });
});
