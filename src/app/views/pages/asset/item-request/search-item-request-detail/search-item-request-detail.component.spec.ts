import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemRequestDetailComponent } from './search-item-request-detail.component';

describe('SearchItemRequestDetailComponent', () => {
  let component: SearchItemRequestDetailComponent;
  let fixture: ComponentFixture<SearchItemRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
