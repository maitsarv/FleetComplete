import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule, Pipe} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePickerPastComponent } from './components/date-picker-past/date-picker-past.component';
import {MapsModule} from './maps/maps.module';
import {ReactiveFormsModule} from '@angular/forms';
import { TimeAgoExtendsPipe } from './time-ago-extends.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import {AppConfigService} from './app-config.service';


@NgModule({
  declarations: [
    AppComponent,
    DatePickerPastComponent,
    TimeAgoExtendsPipe,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MapsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          //Make sure to return a promise!
          return appConfigService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
