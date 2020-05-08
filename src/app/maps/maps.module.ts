import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenStreetMapComponent } from './open-street-map/open-street-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapExtComponent } from './google-map-ext/google-map-ext.component';


@NgModule({
  declarations: [OpenStreetMapComponent, GoogleMapExtComponent],
  exports: [
    OpenStreetMapComponent,
    GoogleMapExtComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule
  ]
})
export class MapsModule { }
