import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSpecificationComponent } from './item-specification.component';

describe('ItemSpecificationComponent', () => {
  let component: ItemSpecificationComponent;
  let fixture: ComponentFixture<ItemSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
