import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemSpecificationComponent } from './search-item-specification.component';

describe('SearchItemSpecificationComponent', () => {
  let component: SearchItemSpecificationComponent;
  let fixture: ComponentFixture<SearchItemSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
