import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSaveTicketComponent } from './search-save-ticket.component';

describe('SearchSaveTicketComponent', () => {
  let component: SearchSaveTicketComponent;
  let fixture: ComponentFixture<SearchSaveTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSaveTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSaveTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
