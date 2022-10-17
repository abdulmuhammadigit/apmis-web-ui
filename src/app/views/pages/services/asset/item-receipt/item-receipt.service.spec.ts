import { TestBed } from '@angular/core/testing';

import { ItemReceiptService } from './item-receipt.service';

describe('ItemReceiptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemReceiptService = TestBed.get(ItemReceiptService);
    expect(service).toBeTruthy();
  });
});
