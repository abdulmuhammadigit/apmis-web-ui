import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveItemDistributionComponent } from './approve-item-distribution.component';

describe('ApproveItemDistributionComponent', () => {
  let component: ApproveItemDistributionComponent;
  let fixture: ComponentFixture<ApproveItemDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveItemDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveItemDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
