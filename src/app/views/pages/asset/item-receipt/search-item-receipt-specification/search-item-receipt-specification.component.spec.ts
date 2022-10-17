import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemReceiptSpecificationComponent } from './search-item-receipt-specification.component';

describe('SearchItemReceiptSpecificationComponent', () => {
  let component: SearchItemReceiptSpecificationComponent;
  let fixture: ComponentFixture<SearchItemReceiptSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemReceiptSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemReceiptSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
