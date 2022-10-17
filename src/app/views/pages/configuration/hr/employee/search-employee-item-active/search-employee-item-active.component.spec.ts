import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmployeeItemActiveComponent } from './search-employee-item-active.component';

describe('SearchEmployeeItemActiveComponent', () => {
  let component: SearchEmployeeItemActiveComponent;
  let fixture: ComponentFixture<SearchEmployeeItemActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEmployeeItemActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEmployeeItemActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
