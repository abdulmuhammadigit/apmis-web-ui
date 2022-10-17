import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFsFiveComponent } from './search-fs-five.component';

describe('SearchFsFiveComponent', () => {
  let component: SearchFsFiveComponent;
  let fixture: ComponentFixture<SearchFsFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFsFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFsFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
