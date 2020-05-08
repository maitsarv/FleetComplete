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
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FleetComplete';
  apiKey = '';
  vehicleList: Vehicle[];
  activeVehicle: Vehicle = null;
  activeFetch = false;
  objectDateFilter = new Date();

  activeObjectList: TimePosition[];

  constructor(private apiService: ApiCommunicatorService, private mapDataService: MapDataService) {

  }

  fetchUnits(key: string) {
    if (this.activeFetch === true) { return; }
    this.apiKey = key;
    this.mapDataService.clearVehicles();
    this.mapDataService.clearVehicleTracks();
    this.activeVehicle = null;
    this.vehicleList = [];
    if (this.apiKey !== '') {
      const testData = '{"status":0,"response":[{"objectId":187360,"orgId":25524,"timestamp":"2020-05-08 11:35:16+0300","latitude":58.160005,"longitude":26.93306,"speed":18,"enginestate":1,"gpsstate":1,"direction":58,"fuel":null,"power":28.66,"CANDistance":null,"available":null,"driverId":null,"driverName":null,"driverKey":null,"driverPhone":null,"driverStatuses":null,"driverIsOnDuty":null,"dutyTags":null,"pairedObjectId":null,"pairedObjectName":null,"lastEngineOnTime":"2020-05-08 11:35:16","inPrivateZone":false,"offWorkSchedule":null,"tripPurposeDinSet":null,"tcoData":null,"tcoCardIsPresent":false,"address":"Puhastuse, Leevij\u00f5e k\u00fcla, P\u00f5lva vald, P\u00f5lvamaa, EE","addressArea":null,"displayColor":null,"employeeId":null,"enforcePrivacyFilter":null,"EVStateOfCharge":null,"EVDistanceRemaining":null,"customValues":[],"objectName":"2832UB","externalId":null,"plate":"2832UB"},{"objectId":187286,"orgId":25524,"timestamp":"2020-05-08 11:10:41+0300","latitude":58.351762,"longitude":26.738953,"speed":0,"enginestate":0,"gpsstate":1,"direction":87,"fuel":null,"power":28.04,"CANDistance":null,"available":null,"driverId":null,"driverName":null,"driverKey":null,"driverPhone":null,"driverStatuses":null,"driverIsOnDuty":null,"dutyTags":null,"pairedObjectId":null,"pairedObjectName":null,"lastEngineOnTime":"2020-05-08 11:10:20","inPrivateZone":false,"offWorkSchedule":null,"tripPurposeDinSet":null,"tcoData":null,"tcoCardIsPresent":false,"address":"Sepa 26, 50104 Tartu, Eesti","addressArea":null,"displayColor":null,"employeeId":null,"enforcePrivacyFilter":null,"EVStateOfCharge":null,"EVDistanceRemaining":null,"customValues":[],"objectName":"1141TU","externalId":null,"plate":"1141TU"},{"objectId":187361,"orgId":25524,"timestamp":"2020-05-08 11:34:46+0300","latitude":58.328397,"longitude":26.74513,"speed":86,"enginestate":1,"gpsstate":1,"direction":282,"fuel":null,"power":28.48,"CANDistance":"60598.275","available":null,"driverId":null,"driverName":null,"driverKey":null,"driverPhone":null,"driverStatuses":null,"driverIsOnDuty":null,"dutyTags":null,"pairedObjectId":null,"pairedObjectName":null,"lastEngineOnTime":"2020-05-08 11:34:46","inPrivateZone":false,"offWorkSchedule":null,"tripPurposeDinSet":null,"tcoData":null,"tcoCardIsPresent":false,"address":"Sahkari, Reola k\u00fcla, Kambja vald, Tartumaa, EE","addressArea":null,"displayColor":null,"employeeId":null,"enforcePrivacyFilter":null,"EVStateOfCharge":null,"EVDistanceRemaining":null,"customValues":[],"GreenDrivingType":2,"CANRPM":1262,"GreenDrivingValue":20,"objectName":"2943RT","externalId":null,"plate":"2943RT"}]}';
      const res = JSON.parse(testData);
      this.activeFetch = false;
      const response: Array<Vehicle> = res.response;
      for (const item of response){
        item.timestampDate = new Date(item.timestamp);
        this.vehicleList.push(item);
      }
      this.mapDataService.positionVehicles(this.vehicleList);
      /*
      this.activeFetch = true;
      this.apiService.getLastData(this.apiKey).subscribe((res) => {
        this.activeFetch = false;
        const response: Array<Vehicle> = res.response;
        for (const item of response){
          item.timestampDate = new Date(item.timestamp);
          this.vehicleList.push(item);
        }
      });
      */
    }
  }

  chooseVehicle(v) {
    this.activeVehicle = v;
  }

  objectDateChanged(date: Date){
    this.objectDateFilter = date;
  }

  calcDistance() {
    if (this.activeVehicle) {
      this.activeFetch = true;
      this.activeObjectList = [];
      this.apiService.getRawData(this.apiKey, this.activeVehicle.objectId, this.objectDateFilter).subscribe((res) => {
        this.activeFetch = false;
        this.activeObjectList = [];
        const response: Array<TimePosition> = res.response;
        let previousDistance = -1;
        for (const item of response){
          item.timestampDate = new Date(item.timestamp);
          if (previousDistance === item.Distance) {
            continue;
          }
          this.activeObjectList.push(item);
          previousDistance = item.Distance;
        }
        this.mapDataService.addVehicleTracks(this.activeObjectList);
      });
    }
  }


}
