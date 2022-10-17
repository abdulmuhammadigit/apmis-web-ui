import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemReallocationComponent } from './search-item-reallocation.component';

describe('SearchItemReallocationComponent', () => {
  let component: SearchItemReallocationComponent;
  let fixture: ComponentFixture<SearchItemReallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemReallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemReallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
