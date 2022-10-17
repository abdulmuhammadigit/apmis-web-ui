import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPropertyRegistrationComponent } from './print-property-registration.component';

describe('PrintPropertyRegistrationComponent', () => {
  let component: PrintPropertyRegistrationComponent;
  let fixture: ComponentFixture<PrintPropertyRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPropertyRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPropertyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
