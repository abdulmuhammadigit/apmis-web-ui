import { TestBed } from '@angular/core/testing';

import { BusinessRuleService } from './business-rule.service';

describe('BusinessRuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessRuleService = TestBed.get(BusinessRuleService);
    expect(service).toBeTruthy();
  });
});
