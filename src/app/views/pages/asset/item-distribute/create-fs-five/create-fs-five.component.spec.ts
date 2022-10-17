import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFsFiveComponent } from './create-fs-five.component';

describe('CreateFsFiveComponent', () => {
  let component: CreateFsFiveComponent;
  let fixture: ComponentFixture<CreateFsFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFsFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFsFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
