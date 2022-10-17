import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemAtrributeComponent } from './add-item-atrribute.component';

describe('AddItemAtrributeComponent', () => {
  let component: AddItemAtrributeComponent;
  let fixture: ComponentFixture<AddItemAtrributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemAtrributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemAtrributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
