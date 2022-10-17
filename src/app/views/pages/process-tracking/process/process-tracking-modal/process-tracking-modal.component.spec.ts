import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTrackingModalComponent } from './process-tracking-modal.component';

describe('ProcessTrackingModalComponent', () => {
  let component: ProcessTrackingModalComponent;
  let fixture: ComponentFixture<ProcessTrackingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTrackingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTrackingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
