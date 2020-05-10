import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TimePosition, Vehicle} from './app.component';
import {AppConfigService} from './app-config.service';

/*
 Service that communicates with Fleet Complete API
 */

interface LastData<T> {
  status: number;
  response: Array<T>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicatorService {

  apiUrl = '';
  requestOptions = {observe: 'body', responseType: 'json'};

  constructor(private http: HttpClient, appConfigService: AppConfigService) {
    this.apiUrl = appConfigService.apiBaseUrl;
  }

  getLastData(key: string) {
    return this.http.get<LastData<Vehicle>>(this.apiUrl + 'getLastData?json&key=' + encodeURIComponent(key));
  }

  getRawData(apiKey: string, object: string, date: Date){
    date = new Date(date);
    let currentTimeZoneDateStr = (date: Date) => {
      var timeOffsetInMS:number = date.getTimezoneOffset() * 60000;
      date.setTime(date.getTime() - timeOffsetInMS);
      return date.toISOString().substring(0, 10);
    };
    const fromDate: string = currentTimeZoneDateStr(date);
    const toDate: string = currentTimeZoneDateStr(new Date(date.setDate(date.getDate() + 1)));
    const paramsObj = {
      key: apiKey,
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
