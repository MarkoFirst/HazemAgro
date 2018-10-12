import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalMovementComponent } from './internal-movement.component';

describe('InternalMovementComponent', () => {
  let component: InternalMovementComponent;
  let fixture: ComponentFixture<InternalMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
