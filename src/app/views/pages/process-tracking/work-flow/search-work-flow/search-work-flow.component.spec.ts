import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkFlowComponent } from './search-work-flow.component';

describe('SearchWorkFlowComponent', () => {
  let component: SearchWorkFlowComponent;
  let fixture: ComponentFixture<SearchWorkFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWorkFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
