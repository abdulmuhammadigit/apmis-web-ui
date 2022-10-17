import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDistributedReportComponent } from './item-distributed-report.component';

describe('ItemDistributedReportComponent', () => {
  let component: ItemDistributedReportComponent;
  let fixture: ComponentFixture<ItemDistributedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDistributedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDistributedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
