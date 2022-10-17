import { TestBed } from '@angular/core/testing';

import { UnitExchangeService } from './unit-exchange.service';

describe('UnitExchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitExchangeService = TestBed.get(UnitExchangeService);
    expect(service).toBeTruthy();
  });
});
