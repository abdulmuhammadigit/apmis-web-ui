import { TestBed } from '@angular/core/testing';

import { ItemReallocationDetailService } from './item-reallocation-detail.service';

describe('ItemReallocationDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemReallocationDetailService = TestBed.get(ItemReallocationDetailService);
    expect(service).toBeTruthy();
  });
});
