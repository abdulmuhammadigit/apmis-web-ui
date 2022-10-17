import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmployeeListComponent } from './search-employee-list.component';

describe('SearchEmployeeListComponent', () => {
  let component: SearchEmployeeListComponent;
  let fixture: ComponentFixture<SearchEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
