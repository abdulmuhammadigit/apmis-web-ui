import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClassificationComponent } from './search-classification.component';

describe('SearchClassificationComponent', () => {
  let component: SearchClassificationComponent;
  let fixture: ComponentFixture<SearchClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
