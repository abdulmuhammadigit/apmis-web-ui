import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintItemDistributeComponent } from './print-item-distribute.component';

describe('PrintItemDistributeComponent', () => {
  let component: PrintItemDistributeComponent;
  let fixture: ComponentFixture<PrintItemDistributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintItemDistributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintItemDistributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
