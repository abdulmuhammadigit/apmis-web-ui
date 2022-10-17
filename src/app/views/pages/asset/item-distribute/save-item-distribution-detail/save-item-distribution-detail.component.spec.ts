import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveItemDistributionDetailComponent } from './save-item-distribution-detail.component';

describe('SaveItemDistributionDetailComponent', () => {
  let component: SaveItemDistributionDetailComponent;
  let fixture: ComponentFixture<SaveItemDistributionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveItemDistributionDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveItemDistributionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
