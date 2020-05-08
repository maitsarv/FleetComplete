import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Subscription} from 'rxjs';
import {MapDataService} from '../../map-data.service';
import {MapMarker, MapPolyline} from '@angular/google-maps';
import {TimePosition} from '../../app.component';
import MarkerClusterer from '@google/markerclustererplus';


interface CurrentMapMarker {
  position: { lat: number, lng: number};
  label: {
    color: string,
    text: string,
  };
  title: string;
  options?: any;
}

interface MapServiceSubscriptions {
  addVehicles: Subscription;
  clearVehicles: Subscription;
  addVehicleTrack: Subscription;
  clearVehicleTrack: Subscription;
}
@Component({
  selector: 'app-google-map-ext',
  templateUrl: './google-map-ext.component.html',
  styleUrls: ['./google-map-ext.component.css']
})
export class GoogleMapExtComponent implements OnInit, OnDestroy {

  markers: CurrentMapMarker[] = [];
  @ViewChildren(MapMarker) markerElements: QueryList<MapMarker>;
  markerCluster;
  polylines: MapPolyline[];

  @ViewChild('map') map;
  zoom = 12;
  center: google.maps.LatLngLiteral;
  subscription: MapServiceSubscriptions = {
    addVehicles: null,
    clearVehicles: null,
    addVehicleTrack: null,
    clearVehicleTrack: null,
  };

  constructor(mapData: MapDataService) {
    this.center = {
      lat: 58.370568,
      lng: 26.715893,
    };
    this.subscription.addVehicles = mapData.vehiclesPositioned$.subscribe(
      vehs => {
        for (const v of vehs){
          this.addMarker(v.objectName, [v.latitude, v.longitude]);
        }
        const markers = [];
        for (const mm of this.markerElements){
          markers.push(mm._marker);
        }
        this.markerCluster = new MarkerClusterer(this.map, markers);
      });

    this.subscription.clearVehicles = mapData.vehiclesCleared$.subscribe(
      () => {
        this.markerCluster.clearMarkers();
        this.markers = [];
      });

    this.subscription.addVehicles = mapData.vehicleTrack$.subscribe(
      tracks => {
        this.addPolyline(tracks);
      });
  }

  ngOnInit(): void {}

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
        color: '#336699',
        text: label,
      },
      title: label
    });
  }


  addPolyline(tracks: TimePosition[]){
    const coords = [];
    for (const pos of tracks){
      coords.push({
        lat: pos.Latitude,
        lng: pos.Longitude,
      });
    }
  }

}
