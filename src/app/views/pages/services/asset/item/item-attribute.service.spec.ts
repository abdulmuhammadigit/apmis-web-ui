import { TestBed } from '@angular/core/testing';

import { ItemAttributeService } from './item-attribute.service';

describe('ItemAttributeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemAttributeService = TestBed.get(ItemAttributeService);
    expect(service).toBeTruthy();
  });
});
