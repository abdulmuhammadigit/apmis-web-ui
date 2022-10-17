import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPricingComponent } from './item-pricing.component';

describe('ItemPricingComponent', () => {
  let component: ItemPricingComponent;
  let fixture: ComponentFixture<ItemPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
