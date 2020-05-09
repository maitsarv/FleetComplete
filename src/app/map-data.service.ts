import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {TimePosition, Vehicle} from './app.component';

/*
 Service that communicates with Maps API
*/

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  // Observable string sources
  private vehiclePositionSource = new Subject<Vehicle[]>();
  private vehiclesClearedSource = new Subject();
  private activeVehicleSource = new Subject<Vehicle>();
  private vehicleTrackSource = new Subject<[TimePosition[], number[]]>();
  private vehicleTrackClearSource = new Subject();

  // Observable string streams
  vehiclesPositioned$ = this.vehiclePositionSource.asObservable();
  vehiclesCleared$ = this.vehiclesClearedSource.asObservable();
  vehiclesActivated$ = this.activeVehicleSource.asObservable();
  vehicleTrack$ = this.vehicleTrackSource.asObservable();
  vehicleTracksCleared$ = this.vehicleTrackClearSource.asObservable();

  // Service message commands
  positionVehicles(vehicles: Vehicle[]) {
    this.vehiclePositionSource.next(vehicles);
  }

  clearVehicles() {
    this.vehiclesClearedSource.next();
  }

  activateVehicle(vehicle: Vehicle) {
    this.activeVehicleSource.next(vehicle);
  }

  addVehicleTracks(positions: TimePosition[], stops: number[]) {
    this.vehicleTrackSource.next([positions, stops]);
  }

  clearVehicleTracks() {
    this.vehicleTrackClearSource.next();
  }
}
