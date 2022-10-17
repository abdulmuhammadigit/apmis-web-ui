import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemReceiptComponent } from './view-item-receipt.component';

describe('ViewItemReceiptComponent', () => {
  let component: ViewItemReceiptComponent;
  let fixture: ComponentFixture<ViewItemReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewItemReceiptComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
