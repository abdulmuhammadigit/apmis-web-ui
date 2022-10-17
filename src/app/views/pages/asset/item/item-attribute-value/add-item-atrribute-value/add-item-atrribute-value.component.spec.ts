import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemAtrributeValueComponent } from './add-item-atrribute-value.component';

describe('AddItemAtrributeValueComponent', () => {
  let component: AddItemAtrributeValueComponent;
  let fixture: ComponentFixture<AddItemAtrributeValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemAtrributeValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemAtrributeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
