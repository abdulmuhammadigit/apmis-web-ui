import { TestBed } from '@angular/core/testing';

import { ItemAttributeValueService } from './item-attribute-value.service';

describe('ItemAttributeValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemAttributeValueService = TestBed.get(ItemAttributeValueService);
    expect(service).toBeTruthy();
  });
});
