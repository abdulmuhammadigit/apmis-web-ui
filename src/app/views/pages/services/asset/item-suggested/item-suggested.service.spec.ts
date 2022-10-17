import { TestBed } from '@angular/core/testing';

import { ItemSuggestedService } from './item-suggested.service';

describe('ItemSuggestedService', () => {
  let service: ItemSuggestedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSuggestedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
