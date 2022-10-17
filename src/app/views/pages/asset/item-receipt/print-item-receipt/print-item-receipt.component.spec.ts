import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintItemReceiptComponent } from './print-item-receipt.component';

describe('PrintItemReceiptComponent', () => {
  let component: PrintItemReceiptComponent;
  let fixture: ComponentFixture<PrintItemReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintItemReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintItemReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
