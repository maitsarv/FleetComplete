import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerPastComponent } from './date-picker-past.component';

describe('DatePickerPastComponent', () => {
  let component: DatePickerPastComponent;
  let fixture: ComponentFixture<DatePickerPastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerPastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
