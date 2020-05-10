import {AfterViewInit, Component, IterableDiffers, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Subscription} from 'rxjs';
import {MapDataService} from '../../map-data.service';
import {MapMarker, MapPolyline} from '@angular/google-maps';
import {TimePosition} from '../../app.component';
import MarkerClusterer from '@google/markerclustererplus';


interface CurrentMapMarker {
  position: { lat: number, lng: number};
  label?: {
    color?: string,
    text?: string,
    fontWeight?: string
  };
  title: string;
  options?: any;
}

interface CurrentMapPolyline {
  path: object[];
}

interface MapServiceSubscriptions {
  addVehicles: Subscription;
  clearVehicles: Subscription;
  activateVehicle: Subscription;
  addVehicleTrack: Subscription;
  clearVehicleTrack: Subscription;
  markerChanges: Subscription;
}
@Component({
  selector: 'app-google-map-ext',
  templateUrl: './google-map-ext.component.html',
  styleUrls: ['./google-map-ext.component.css']
})
export class GoogleMapExtComponent implements OnInit, OnDestroy, AfterViewInit {

  markers: CurrentMapMarker[] = [];
  stopMarkers: CurrentMapMarker[] = [];
  @ViewChildren(MapMarker) markerElements: QueryList<MapMarker>;
  markerCluster = null;
  polylines: CurrentMapPolyline[] = [];
  markerDiffer;
  distService = {
    matInstance: new google.maps.DistanceMatrixService(),
    routeInstance: new google.maps.DirectionsService(),
    distServiceCount: 0
  };


  @ViewChild('map') map;
  zoom = 12;
  center: google.maps.LatLngLiteral;
  subscription: MapServiceSubscriptions = {
    addVehicles: null,
    clearVehicles: null,
    activateVehicle: null,
    addVehicleTrack: null,
    clearVehicleTrack: null,
    markerChanges: null,
  };

  constructor(private mapData: MapDataService, private differs: IterableDiffers) {
    this.center = {
      lat: 58.370568,
      lng: 26.715893,
    };
    this.markerDiffer = this.differs.find([]).create(null);
    this.subscription.addVehicles = mapData.vehiclesPositioned$.subscribe(
      vehs => {
        for (const v of vehs){
          this.addMarker(v.objectName, [v.latitude, v.longitude]);
        }
      });

    this.subscription.clearVehicles = mapData.vehiclesCleared$.subscribe(
      () => {
        if (this.markerCluster !== null) { this.markerCluster.clearMarkers(); }
        this.markers = [];
        this.stopMarkers = [];
      });

    this.subscription.addVehicles = mapData.vehicleTrack$.subscribe(
      tracks => {
        this.addPolyline(tracks[0], tracks[1]);
      });
    this.subscription.clearVehicleTrack = mapData.vehicleTracksCleared$.subscribe(
      () => {
        this.polylines = [];
        this.stopMarkers = [];
      });

    this.subscription.activateVehicle = mapData.vehiclesActivated$.subscribe(
      (veh) => {
        this.center = {
          lat: veh.latitude,
          lng: veh.longitude,
        };
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.markerCluster = new MarkerClusterer(this.map._googleMap, [], {imagePath: 'assets/img/maps_cluster/m', imageExtension: 'png'});
    this.subscription.markerChanges = this.markerElements.changes.subscribe(
      tracks => {
        const changeDiff = this.markerDiffer.diff(tracks);
        if (changeDiff) {
          changeDiff.forEachAddedItem((change) => {
            const marker = change.item._marker;
            if (marker.getTitle() === '') {
              return;
            }
            this.markerCluster.addMarker(marker);
          });
          changeDiff.forEachRemovedItem((change) => {
            const marker = change.item._marker;
            if (marker.getTitle() === '') {
              return;
            }
            this.markerCluster.removeMarker(marker);
          });
        }
      });
  }

  ngOnDestroy() {
    // tslint:disable-next-line:forin
    for (const s in this.subscription){
      if (this.subscription[s] === null) {
        continue;
      }
      this.subscription[s].unsubscribe();
    }
  }

  addMarker(label: string, position: [number, number]) {
    this.markers.push({
      position: {
        lat: position[0],
        lng: position[1],
      },
      label: {
        color: '#080808',
        text: label,
        fontWeight: '500'
      },
      title: label,
      options: {animation: google.maps.Animation.DROP}
    });
  }


  addPolyline(tracks: TimePosition[], stops: number[]){
    const coords = [];
    for (const pos of tracks){
      coords.push({
        lat: pos.Latitude,
        lng: pos.Longitude,
      });
    }

    const waypoints: google.maps.LatLng[] = [];
    if (stops.length > 0){
      waypoints.push(new google.maps.LatLng(coords[0]));
    }
    const bounds = new google.maps.LatLngBounds();
    for (const s of stops){
      this.stopMarkers.push({
        position: coords[s],
        title: '',
        options: {icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4
          }}
      });
      bounds.extend(coords[s]);
      waypoints.push(new google.maps.LatLng(coords[s]));
    }

    if (stops.length > 0) {
      if (stops.length > 1) {
        this.map._googleMap.fitBounds(bounds);
      } else {
        this.center = coords[stops[0]];
      }
      const lw = waypoints[waypoints.length - 1];
      const lc = coords[coords.length - 1];
      if (lw.lat() !== lc.lat || lw.lng() !== lc.lng){
        waypoints.push(new google.maps.LatLng(lc));
      }
    }
    this.polylines.push({
      path: coords
    });
    if (coords.length > 0){
      this.requestOptimalRouteByRoute(waypoints);
    } else {
      this.mapData.sendCalculatedDistance("-");
    }
  }

  requestOptimalRouteByRoute(waypoints: google.maps.LatLng[]){


    let wayPointChuncks: google.maps.DirectionsRequest[] = [];
    let distlen = 10;
    let c = 0;
    let chunk: google.maps.DirectionsRequest = {
      origin: null,
      destination: null,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: []
    };
    distlen+=2;
    for (let i = 0; i < waypoints.length; i++){

      c++;
      switch (c) {
        case 1:
          chunk.origin = waypoints[i];
          break;
        case distlen:
          chunk.destination = waypoints[i];
          wayPointChuncks.push(chunk);
          chunk = {
            origin: null,
            destination: null,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: []
          };
          c=0;
          i--;
          break;
        default:
          // @ts-ignore
          chunk.waypoints.push({ location: waypoints[i], stopover:true});
      }

    }
    if (chunk.waypoints.length > 0){
      let end = chunk.waypoints.pop();
      chunk.destination = end.location;
      wayPointChuncks.push(chunk);
    }

    let reqD = {
      req: this.distService.routeInstance.route,
      statuses: google.maps.DirectionsStatus,
      calcDistance: function(response): number {
        let distance = 0;
        for (const leg of response.routes[0].legs){
          if (leg.distance !== undefined){
            distance += leg.distance.value;
          } else {
            return  null;
          }
        }
        return distance;
      }
    };
    this.processWayPointChunks(wayPointChuncks, reqD);
  }


  // Try the matrix request. sends less data, but slower since needs to request every distance separately.
  requestOptimalRouteByMatrix(waypoints: google.maps.LatLng[]){
    const dest = waypoints.slice(1);
    waypoints.pop();

    let wayPointChuncks: google.maps.DistanceMatrixRequest[] = [];
    let distlen = 1;
    let j = 0;
    let c = 0;
    let chunk: google.maps.DistanceMatrixRequest = {
      origins: [],
      destinations: [],
      travelMode: google.maps.TravelMode.DRIVING
    };
    for (let i = 1; i < waypoints.length; i++,j++){
      // @ts-ignore
      chunk.origins.push(waypoints[j]);
      // @ts-ignore
      chunk.destinations.push(waypoints[i]);
      c++;
      if (c >= distlen){
        wayPointChuncks.push(chunk);
        chunk = {
          origins: [],
          destinations: [],
          travelMode: google.maps.TravelMode.DRIVING
        };
        c=0;
      }
    }
    if (chunk.origins.length > 0){
      wayPointChuncks.push(chunk);
    }

    let reqD = {
      req: this.distService.matInstance.getDistanceMatrix,
      statuses: google.maps.DistanceMatrixStatus,
      calcDistance: function(response): number {
        let distance = 0;
        for (const r of response.rows){
          let elems = r.elements;
          for (const elem of elems){
            if (elem.status === 'OK') {
              distance += elem.distance.value;
            } else {
              return null;
            }
          }
        }
        return distance;
      }
    };
    this.processWayPointChunks(wayPointChuncks, reqD);
  }

   processWayPointChunks(wayPointChuncks: google.maps.DistanceMatrixRequest[], requestFunctionData){
    this.distService.distServiceCount++;
    const currentDistServiceCount = this.distService.distServiceCount;
    const localService = this.distService;
    const localMapData = this.mapData;
    let totalDistance: number = 0;
    let getDistances = function(dist: google.maps.DistanceMatrixRequest, count: number) {
      count++;
      requestFunctionData.req(dist, (response, status) => {
        if(currentDistServiceCount !== localService.distServiceCount) {
          localMapData.sendCalculatedDistance("");
          return;
        }
        if (status === requestFunctionData.statuses.OK) {
          let distance = requestFunctionData.calcDistance(response);
          if (distance === null){
            localMapData.sendCalculatedDistance("-");
            return;
          } else {
            totalDistance += distance;
          }
          if(wayPointChuncks.length>0){
            setTimeout(() => {getDistances(wayPointChuncks.shift(),0)},10);
          } else {
            const km = totalDistance/1000;
            localMapData.sendCalculatedDistance(km.toFixed(2));
          }
        } else if (status === requestFunctionData.statuses.OVER_QUERY_LIMIT && count < 4) {
          console.error('Maps error: ', status, count);
          setTimeout(() => {getDistances(dist,count)},200*count);
        } else {
          localMapData.sendCalculatedDistance("-");
        }
      });
    };

    if(wayPointChuncks.length>0){
      getDistances(wayPointChuncks.shift(),0)
    } else {
      localMapData.sendCalculatedDistance("-");
    }
  }

}
