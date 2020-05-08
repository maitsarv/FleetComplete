import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {TimePosition, Vehicle} from './app.component';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  // Observable string sources
  private vehiclePositionSource = new Subject<Vehicle[]>();
  private vehiclesClearedSource = new Subject();
  private vehicleTrackSource = new Subject<TimePosition[]>();
  private vehicleTrackClearSource = new Subject();

  // Observable string streams
  vehiclesPositioned$ = this.vehiclePositionSource.asObservable();
  vehiclesCleared$ = this.vehiclePositionSource.asObservable();
  vehicleTrack$ = this.vehicleTrackSource.asObservable();

  // Service message commands
  positionVehicles(vehicles: Vehicle[]) {
    this.vehiclePositionSource.next(vehicles);
  }

  clearVehicles() {
    this.vehiclesClearedSource.next();
  }

  addVehicleTracks(positions: TimePosition[]) {
    this.vehicleTrackSource.next(positions);
  }

  clearVehicleTracks() {
    this.vehicleTrackClearSource.next();
  }
}
