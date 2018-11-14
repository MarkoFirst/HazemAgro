import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateTableComponent } from './navigate-table.component';

describe('NavigateTableComponent', () => {
  let component: NavigateTableComponent;
  let fixture: ComponentFixture<NavigateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
