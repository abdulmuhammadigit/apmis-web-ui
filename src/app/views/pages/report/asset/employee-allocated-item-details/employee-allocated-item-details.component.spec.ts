import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAllocatedItemDetailsComponent } from './employee-allocated-item-details.component';

describe('EmployeeAllocatedItemDetailsComponent', () => {
  let component: EmployeeAllocatedItemDetailsComponent;
  let fixture: ComponentFixture<EmployeeAllocatedItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAllocatedItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAllocatedItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
