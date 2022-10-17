import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemReallocationComponent } from './create-item-reallocation.component';

describe('CreateItemReallocationComponent', () => {
  let component: CreateItemReallocationComponent;
  let fixture: ComponentFixture<CreateItemReallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateItemReallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemReallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
