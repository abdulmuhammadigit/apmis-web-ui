import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlItemDistributionComponent } from './control-item-distribution.component';

describe('ControlItemDistributionComponent', () => {
  let component: ControlItemDistributionComponent;
  let fixture: ComponentFixture<ControlItemDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlItemDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlItemDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
