import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemDetailComponent } from './search-item-detail.component';

describe('SearchItemDetailComponent', () => {
  let component: SearchItemDetailComponent;
  let fixture: ComponentFixture<SearchItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
