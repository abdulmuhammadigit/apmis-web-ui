import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemRemainComponent } from './search-item-remain.component';

describe('SearchItemRemainComponent', () => {
  let component: SearchItemRemainComponent;
  let fixture: ComponentFixture<SearchItemRemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchItemRemainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
