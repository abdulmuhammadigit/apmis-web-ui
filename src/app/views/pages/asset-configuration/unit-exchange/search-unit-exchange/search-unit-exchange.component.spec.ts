import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUnitExchangeComponent } from './search-unit-exchange.component';

describe('SearchUnitExchangeComponent', () => {
  let component: SearchUnitExchangeComponent;
  let fixture: ComponentFixture<SearchUnitExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUnitExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUnitExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
