import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAttributeValueComponent } from './item-attribute-value.component';

describe('ItemAttributeValueComponent', () => {
  let component: ItemAttributeValueComponent;
  let fixture: ComponentFixture<ItemAttributeValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAttributeValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAttributeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
