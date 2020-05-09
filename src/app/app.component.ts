import { Component } from '@angular/core';
import {ApiCommunicatorService} from './api-communicator.service';
import {MapDataService} from './map-data.service';


export interface Vehicle {
  objectId: string;
  objectName: string;
  plate: string;
  speed: string;
  timestamp: string;
  longitude: number;
  latitude: number;
  timestampDate?: Date;
}

export interface TimePosition {
  timestamp: string;
  Longitude: number;
  Latitude: number;
  EngineStatus: string;
  timestampDate?: Date;
  Distance: number;
  speed: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FleetComplete';
  apiKey = '';
  vehicleList: Vehicle[] = [];
  activeVehicle: Vehicle = null;
  activeFetch = false;
  objectDateFilter = new Date();

  activeObjectList: TimePosition[];
  objectDisplayInfo = {
    activeObjectStops: [],
    traveledDistance: null,
    calcDistance: null
  };

  constructor(private apiService: ApiCommunicatorService, private mapDataService: MapDataService) {

  }

  fetchUnits(akey: string) {
    if (this.activeFetch === true) { return;}
    this.apiKey = akey;
    this.mapDataService.clearVehicles();
    this.clearVehicleInfo();
    this.activeVehicle = null;
    this.vehicleList = [];
    if (this.apiKey !== '') {
      this.activeFetch = true;
      this.apiService.getLastData(this.apiKey).subscribe((res) => {
          this.activeFetch = false;
          const response: Array<Vehicle> = res.response;
          for (const item of response){
            item.timestampDate = new Date(item.timestamp);
            this.vehicleList.push(item);
          }
          this.mapDataService.positionVehicles(this.vehicleList);
        },
        (error) => {
          this.activeFetch = false;
          console.error(error);
        }
      );
    }
  }

  chooseVehicle(v) {
    if (this.activeVehicle !== null && this.activeVehicle.objectId !== v.objectId){
      this.clearVehicleInfo();
    }
    this.activeVehicle = v;
    this.mapDataService.activateVehicle(v);
  }

  objectDateChanged(date: Date){
    this.objectDateFilter = date;
  }

  private clearVehicleInfo(){
    // tslint:disable-next-line:forin
    for (const k in this.objectDisplayInfo){
      this.objectDisplayInfo[k] = '';
    }
    this.mapDataService.clearVehicleTracks();
  }

  calcDistance() {
    this.clearVehicleInfo();
    if (this.activeVehicle) {
      this.activeFetch = true;
      this.activeObjectList = [];
      this.apiService.getRawData(this.apiKey, this.activeVehicle.objectId, this.objectDateFilter).subscribe((res) => {
        this.activeFetch = false;
        this.activeObjectList = [];
        const stops: number[] = [];
        const response: Array<TimePosition> = res.response;
        if (response.length > 0){
          let previousTime = new Date(response[0].timestamp);
          let previousDistance = -1;
          let num = 0;
          for (const item of response){
            if (previousDistance === item.Distance) {
              continue;
            }
            item.timestampDate = new Date(item.timestamp);
            // if time difference between movements is over 5 minutes
            if (item.timestampDate.valueOf() - previousTime.valueOf() > 300000) {
              stops.push(num);
            }
            num++;
            this.activeObjectList.push(item);
            previousDistance = item.Distance;
            previousTime = item.timestampDate;
          }
          this.objectDisplayInfo.activeObjectStops = stops;
          this.objectDisplayInfo.traveledDistance =
            (this.activeObjectList[this.activeObjectList.length - 1].Distance - this.activeObjectList[0].Distance).toFixed(2);
        }

        this.mapDataService.addVehicleTracks(this.activeObjectList, stops);
      },
      error => {
        this.activeFetch = false;
        console.error(error);
      }
    );
    }
  }


}
