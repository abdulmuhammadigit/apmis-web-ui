import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStockKeeperComponent } from './search-stock-keeper.component';

describe('SearchStockKeeperComponent', () => {
  let component: SearchStockKeeperComponent;
  let fixture: ComponentFixture<SearchStockKeeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStockKeeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStockKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
