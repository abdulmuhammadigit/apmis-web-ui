import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsdModalComponent } from './isd-modal.component';

describe('IsdModalComponent', () => {
  let component: IsdModalComponent;
  let fixture: ComponentFixture<IsdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsdModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
