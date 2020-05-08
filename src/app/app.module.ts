import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePickerPastComponent } from './datepicker/date-picker-past/date-picker-past.component';
import {MapsModule} from './maps/maps.module';
import {ReactiveFormsModule} from '@angular/forms';
import { TimeAgoExtendsPipe } from './time-ago-extends.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DatePickerPastComponent,
    TimeAgoExtendsPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MapsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
