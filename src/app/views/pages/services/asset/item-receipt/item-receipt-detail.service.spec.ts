import { TestBed } from '@angular/core/testing';

import { ItemReceiptDetailService } from './item-receipt-detail.service';

describe('ItemReceiptDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemReceiptDetailService = TestBed.get(ItemReceiptDetailService);
    expect(service).toBeTruthy();
  });
});
