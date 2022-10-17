import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemRequestComponent } from './create-item-request.component';

describe('CreateItemRequestComponent', () => {
  let component: CreateItemRequestComponent;
  let fixture: ComponentFixture<CreateItemRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateItemRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
