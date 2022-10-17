import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRequestDetailsComponent } from './item-request-details.component';

describe('ItemRequestDetailsComponent', () => {
  let component: ItemRequestDetailsComponent;
  let fixture: ComponentFixture<ItemRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
