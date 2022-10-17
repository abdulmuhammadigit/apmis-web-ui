import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReallocateSpecificationComponent } from './item-reallocate-specification.component';

describe('ItemReallocateSpecificationComponent', () => {
  let component: ItemReallocateSpecificationComponent;
  let fixture: ComponentFixture<ItemReallocateSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemReallocateSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReallocateSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
