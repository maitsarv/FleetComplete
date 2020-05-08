import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {TimePosition, Vehicle} from './app.component';


interface LastData<T> {
  status: number;
  response: Array<T>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicatorService {

  apiUrl = 'https://localhost:4200/seeme/Api/Vehicles/';
  requestOptions = {observe: 'body', responseType: 'json'};

  constructor(private http: HttpClient) { }

  getLastData(key: string) {
    return this.http.get<LastData<Vehicle>>(this.apiUrl + 'getLastData?json&key=' + encodeURIComponent(key));
  }

  getRawData(key: string, object: string, date: Date){
    const fromDate: string = date.toISOString().substring(0, 10);
    const toDate: string = new Date(date.setDate(date.getDate() + 1)).toISOString().substring(0, 10);
    const paramsObj = {
      key,
      begTimestamp : fromDate,
      endTimestamp : toDate,
      objectId : object
    };
    // Not very efficient way of putting together string, but the object is small enough.
    const requestParams = Object.keys(paramsObj).map((akey) => {
      return encodeURIComponent(akey) + '=' + encodeURIComponent(paramsObj[akey]);
    }).join('&');
    const url = this.apiUrl + 'getRawData?json&' + requestParams;
    return this.http.get<LastData<TimePosition>>(url);
  }
}
