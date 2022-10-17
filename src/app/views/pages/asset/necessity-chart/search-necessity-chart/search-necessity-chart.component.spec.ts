import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNecessityChartComponent } from './search-necessity-chart.component';

describe('SearchChartComponent', () => {
  let component: SearchNecessityChartComponent;
  let fixture: ComponentFixture<SearchNecessityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNecessityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNecessityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
