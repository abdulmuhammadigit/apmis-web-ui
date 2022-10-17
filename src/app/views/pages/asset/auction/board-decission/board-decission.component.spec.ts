import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDecissionComponent } from './board-decission.component';

describe('BoardDecissionComponent', () => {
  let component: BoardDecissionComponent;
  let fixture: ComponentFixture<BoardDecissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardDecissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDecissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
