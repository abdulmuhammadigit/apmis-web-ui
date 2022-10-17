import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintItemSuggestedComponent } from './print-item-suggested.component';

describe('PrintItemSuggestedComponent', () => {
  let component: PrintItemSuggestedComponent;
  let fixture: ComponentFixture<PrintItemSuggestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintItemSuggestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintItemSuggestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
