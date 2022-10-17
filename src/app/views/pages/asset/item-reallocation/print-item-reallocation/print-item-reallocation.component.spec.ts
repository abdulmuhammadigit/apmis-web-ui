import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintItemReallocationComponent } from './print-item-reallocation.component';

describe('PrintItemReallocationComponent', () => {
  let component: PrintItemReallocationComponent;
  let fixture: ComponentFixture<PrintItemReallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintItemReallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintItemReallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
