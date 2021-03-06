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
  Distance?: number;
  DeltaDistance?: number;
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
  vehicleList: Map<string ,Vehicle> = new Map<string, Vehicle>();
  activeVehicle: Vehicle = null;
  activeFetch = false;
  activeFetchLoop = null;
  objectDateFilter = new Date();
  stopTimeThreshold = 120000;
  stopAllowedDistance = 0.008;
  activeObjectList: TimePosition[];
  objectDisplayInfo = {
    activeObjectStops: [],
    traveledDistance: null,
    calcDistance: "",
  };

  constructor(private apiService: ApiCommunicatorService, private mapDataService: MapDataService) {
    mapDataService.distanceCalculated$.subscribe( (dist) => {
      this.objectDisplayInfo.calcDistance = dist;
    })
  }

  fetchListFromApi(){
    this.apiService.getLastData(this.apiKey).subscribe((res) => {
        if (this.activeFetch === true) return;
        const response: Array<Vehicle> = res.response;
        for (const item of response){
          if(this.vehicleList.get(item.objectId)) {
            this.vehicleList.set(item.objectId,item);
          }
        }
        this.mapDataService.positionVehicles(this.vehicleList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchUnits(akey: string) {
    if (this.activeFetch === true) { return;}
    if (this.activeFetchLoop !== null) clearInterval(this.activeFetchLoop);
    this.apiKey = akey;
    this.mapDataService.clearVehicles();
    this.clearVehicleInfo();
    this.activeVehicle = null;
    this.vehicleList = new Map<string, Vehicle>();
    if (this.apiKey !== '') {
      this.activeFetch = true;
      this.apiService.getLastData(this.apiKey).subscribe((res) => {
          this.activeFetch = false;
          const response: Array<Vehicle> = res.response;
          for (const item of response){
            item.timestampDate = new Date(item.timestamp);
            this.vehicleList.set(item.objectId,item);
          }
          this.mapDataService.positionVehicles(this.vehicleList);
          let fetchList = this.fetchListFromApi;
          let context = this;
          this.activeFetchLoop = setInterval(function() {
            fetchList.call(context);
          },30000);
        },
        (error) => {
          this.activeFetch = false;
          this.apiKey == '';
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
        this.objectDisplayInfo.calcDistance = null;
        this.activeObjectList = [];
        const stops: number[] = [];
        const response: Array<TimePosition> = res.response;
        if (response.length > 0){
          let previousTime = new Date(response[0].timestamp);
          let previousDistance = -1;
          let previousStopDistance = -1;
          let num = 0;
          let totalT = 0;
          for (const item of response){
            if(item.timestamp === undefined) continue;
            item.timestampDate = new Date(item.timestamp);

            if (item.Distance === undefined) {
              if(item.DeltaDistance === undefined || item.DeltaDistance === null) {
                continue;
              }
              totalT += item.DeltaDistance;
              item.Distance = totalT;
            } else {
              if (previousDistance === item.Distance) {
                continue;
              }
            }

            // if time difference between movements is over x minutes
            if (item.timestampDate.valueOf() - previousTime.valueOf() > this.stopTimeThreshold && item.Distance - previousStopDistance > this.stopAllowedDistance) {
              stops.push(num);
              previousStopDistance = item.Distance;
            }
            num++;
            this.activeObjectList.push(item);
            previousDistance = item.Distance;
            previousTime = item.timestampDate;
          }
          if(this.activeObjectList.length > 0) {
            this.objectDisplayInfo.activeObjectStops = stops;
            this.objectDisplayInfo.traveledDistance =
              (this.activeObjectList[this.activeObjectList.length - 1].Distance - this.activeObjectList[0].Distance).toFixed(2);
          } else {
            if(totalT > 0)this.objectDisplayInfo.traveledDistance = totalT.toFixed(2);
          }
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
