import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlItemRequestComponent } from './control-item-request.component';

describe('ControlItemRequestComponent', () => {
  let component: ControlItemRequestComponent;
  let fixture: ComponentFixture<ControlItemRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlItemRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlItemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
