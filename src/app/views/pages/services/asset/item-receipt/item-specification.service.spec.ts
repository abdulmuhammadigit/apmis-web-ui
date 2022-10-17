import { TestBed } from '@angular/core/testing';

import { ItemSpecificationService } from './item-specification.service';

describe('ItemSpecificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemSpecificationService = TestBed.get(ItemSpecificationService);
    expect(service).toBeTruthy();
  });
});
