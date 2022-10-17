import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemReceiptDetailComponent } from './search-item-receipt-detail.component';

describe('SearchItemReceiptDetailComponent', () => {
  let component: SearchItemReceiptDetailComponent;
  let fixture: ComponentFixture<SearchItemReceiptDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemReceiptDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemReceiptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
