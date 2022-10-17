import { TestBed } from '@angular/core/testing';

import { ItemSuggestedDetailService } from './item-suggested-detail.service';

describe('ItemSuggestedDetailService', () => {
  let service: ItemSuggestedDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSuggestedDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
