import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockKeeperComponent } from './create-stock-keeper.component';

describe('CreateStockKeeperComponent', () => {
  let component: CreateStockKeeperComponent;
  let fixture: ComponentFixture<CreateStockKeeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockKeeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
