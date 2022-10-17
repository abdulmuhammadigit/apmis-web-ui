import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnitExchangeComponent } from './create-unit-exchange.component';

describe('CreateUnitExchangeComponent', () => {
  let component: CreateUnitExchangeComponent;
  let fixture: ComponentFixture<CreateUnitExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUnitExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUnitExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
