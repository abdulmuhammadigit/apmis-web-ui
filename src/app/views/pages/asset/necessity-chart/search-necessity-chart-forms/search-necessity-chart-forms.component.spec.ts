import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNecessityChartFormsComponent } from './search-necessity-chart-forms.component';

describe('SearchNecessityChartFormsComponent', () => {
  let component: SearchNecessityChartFormsComponent;
  let fixture: ComponentFixture<SearchNecessityChartFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNecessityChartFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNecessityChartFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
