import { TestBed } from '@angular/core/testing';

import { ItemReallocationService } from './item-reallocation.service';

describe('ItemReallocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemReallocationService = TestBed.get(ItemReallocationService);
    expect(service).toBeTruthy();
  });
});
