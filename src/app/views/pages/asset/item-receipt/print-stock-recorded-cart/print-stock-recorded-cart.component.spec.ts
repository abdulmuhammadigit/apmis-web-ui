import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintStockRecordedCartComponent } from './print-stock-recorded-cart.component';

describe('PrintStockRecordedCartComponent', () => {
  let component: PrintStockRecordedCartComponent;
  let fixture: ComponentFixture<PrintStockRecordedCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintStockRecordedCartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintStockRecordedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
