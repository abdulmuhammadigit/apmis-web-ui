import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesAllocatedItemsComponent } from './employees-allocated-items.component';

describe('EmployeesAllocatedItemsComponent', () => {
  let component: EmployeesAllocatedItemsComponent;
  let fixture: ComponentFixture<EmployeesAllocatedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesAllocatedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesAllocatedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
