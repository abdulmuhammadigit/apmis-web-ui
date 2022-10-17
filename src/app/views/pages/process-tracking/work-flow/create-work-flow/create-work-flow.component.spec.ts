import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkFlowComponent } from './create-work-flow.component';

describe('CreateWorkFlowComponent', () => {
  let component: CreateWorkFlowComponent;
  let fixture: ComponentFixture<CreateWorkFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
