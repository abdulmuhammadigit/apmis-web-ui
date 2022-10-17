import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStatusReportComponent } from './item-status-report.component';

describe('ItemStatusReportComponent', () => {
  let component: ItemStatusReportComponent;
  let fixture: ComponentFixture<ItemStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemStatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
