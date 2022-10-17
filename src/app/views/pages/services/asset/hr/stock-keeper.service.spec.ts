import { TestBed } from '@angular/core/testing';

import { StockKeeperService } from './stock-keeper.service';

describe('StockKeeperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockKeeperService = TestBed.get(StockKeeperService);
    expect(service).toBeTruthy();
  });
});
