import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommissionDecisionComponent } from './create-commission-decision.component';

describe('CreateCommissionDecisionComponent', () => {
  let component: CreateCommissionDecisionComponent;
  let fixture: ComponentFixture<CreateCommissionDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommissionDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommissionDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
