import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintItemRequestComponent } from './print-item-request.component';

describe('PrintItemRequestComponent', () => {
  let component: PrintItemRequestComponent;
  let fixture: ComponentFixture<PrintItemRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintItemRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintItemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
