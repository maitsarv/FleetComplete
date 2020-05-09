import {AfterViewInit, Component, IterableDiffers, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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
    fontWeight: string
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
  @ViewChildren(MapMarker) markerElements: QueryList<MapMarker>;
  markerCluster = null;
  polylines: CurrentMapPolyline[] = [];
  markerDiffer;

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

  constructor(mapData: MapDataService, private differs: IterableDiffers) {
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
      });

    this.subscription.addVehicles = mapData.vehicleTrack$.subscribe(
      tracks => {
        this.addPolyline(tracks[0],tracks[1]);
      });
    this.subscription.clearVehicleTrack = mapData.vehicleTracksCleared$.subscribe(
      () => {
        this.polylines = [];
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
            this.markerCluster.addMarker(change.item._marker);
          });
          changeDiff.forEachRemovedItem((change) => {
            this.markerCluster.removeMarker(change.item._marker);
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
    console.log('stops', stops);
    for (const pos of tracks){
      coords.push({
        lat: pos.Latitude,
        lng: pos.Longitude,
      });
    }
    this.polylines.push({
      path: coords
    });
  }

}
