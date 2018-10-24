import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMoneyComponent } from './table-money.component';

describe('TableMoneyComponent', () => {
  let component: TableMoneyComponent;
  let fixture: ComponentFixture<TableMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
