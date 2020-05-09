import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-date-picker-past',
  templateUrl: './date-picker-past.component.html',
  styleUrls: ['./date-picker-past.component.css']
})
export class DatePickerPastComponent implements OnInit {
  maxDate: Date;
  selectedDate: FormControl;
  @Output() dateChanged = new EventEmitter<Date>();

  constructor() {
    this.maxDate = new Date();
    this.selectedDate = new FormControl(this.maxDate);
    this.dateChanged.emit(this.selectedDate.value);
  }

  dateChange(){
    this.dateChanged.emit(this.selectedDate.value);
  }

  ngOnInit(): void {
  }

}
