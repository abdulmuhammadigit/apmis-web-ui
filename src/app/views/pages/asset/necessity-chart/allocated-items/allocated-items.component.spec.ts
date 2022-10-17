import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedItemsComponent } from './allocated-items.component';

describe('AllocatedItemsComponent', () => {
  let component: AllocatedItemsComponent;
  let fixture: ComponentFixture<AllocatedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
