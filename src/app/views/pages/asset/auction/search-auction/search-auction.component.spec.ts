import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAuctionComponent } from './search-auction.component';

describe('SearchAuctionComponent', () => {
  let component: SearchAuctionComponent;
  let fixture: ComponentFixture<SearchAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
