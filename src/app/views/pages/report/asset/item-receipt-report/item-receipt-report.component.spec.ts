import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReceiptReportComponent } from './item-receipt-report.component';

describe('ItemReceiptReportComponent', () => {
  let component: ItemReceiptReportComponent;
  let fixture: ComponentFixture<ItemReceiptReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReceiptReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReceiptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
