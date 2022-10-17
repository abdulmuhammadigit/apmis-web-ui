import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemRequestComponent } from './search-item-request.component';

describe('SearchF9RequestFormComponent', () => {
  let component: SearchItemRequestComponent;
  let fixture: ComponentFixture<SearchItemRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
