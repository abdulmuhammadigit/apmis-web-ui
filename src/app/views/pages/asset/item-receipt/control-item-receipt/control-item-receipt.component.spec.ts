import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlItemReceiptComponent } from './control-item-receipt.component';

describe('ControlItemReceiptComponent', () => {
  let component: ControlItemReceiptComponent;
  let fixture: ComponentFixture<ControlItemReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlItemReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlItemReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
