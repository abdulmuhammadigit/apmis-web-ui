import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiscalYearComponent } from './search-fiscal-year.component';

describe('SearchFiscalYearComponent', () => {
  let component: SearchFiscalYearComponent;
  let fixture: ComponentFixture<SearchFiscalYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFiscalYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFiscalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
