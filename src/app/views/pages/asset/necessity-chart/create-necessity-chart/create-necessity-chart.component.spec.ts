import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNecessityChartComponent } from './create-necessity-chart.component';

describe('CreateComponent', () => {
  let component: CreateNecessityChartComponent;
  let fixture: ComponentFixture<CreateNecessityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNecessityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNecessityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
