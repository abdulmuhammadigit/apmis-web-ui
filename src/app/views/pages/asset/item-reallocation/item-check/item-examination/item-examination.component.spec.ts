import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemExaminationComponent } from './item-examination.component';

describe('ItemExaminationComponent', () => {
  let component: ItemExaminationComponent;
  let fixture: ComponentFixture<ItemExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
