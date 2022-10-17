import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAuctionComponent } from './print-auction.component';

describe('PrintAuctionComponent', () => {
  let component: PrintAuctionComponent;
  let fixture: ComponentFixture<PrintAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
