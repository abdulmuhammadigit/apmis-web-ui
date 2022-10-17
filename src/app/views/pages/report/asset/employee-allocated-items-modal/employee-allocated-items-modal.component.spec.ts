import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAllocatedItemsModalComponent } from './employee-allocated-items-modal.component';

describe('EmployeeAllocatedItemsModalComponent', () => {
  let component: EmployeeAllocatedItemsModalComponent;
  let fixture: ComponentFixture<EmployeeAllocatedItemsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAllocatedItemsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAllocatedItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
