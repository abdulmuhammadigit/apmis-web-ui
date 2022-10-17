import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStageComponent } from './search-stage.component';

describe('SearchStageComponent', () => {
  let component: SearchStageComponent;
  let fixture: ComponentFixture<SearchStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
