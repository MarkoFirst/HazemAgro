import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMovementComponent } from './table-movement.component';

describe('TableMovementComponent', () => {
  let component: TableMovementComponent;
  let fixture: ComponentFixture<TableMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
