import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsdGridviewComponent } from './isd-gridview.component';

describe('IsdGridviewComponent', () => {
  let component: IsdGridviewComponent;
  let fixture: ComponentFixture<IsdGridviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsdGridviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsdGridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
