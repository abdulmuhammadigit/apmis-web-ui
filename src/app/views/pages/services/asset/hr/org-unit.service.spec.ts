import { TestBed } from '@angular/core/testing';

import { OrgUnitService } from './org-unit.service';

describe('OrgUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgUnitService = TestBed.get(OrgUnitService);
    expect(service).toBeTruthy();
  });
});
