import {Component, OnInit} from '@angular/core';
import {Map as OsMap, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {defaults as defaultControls} from 'ol/control';
import OSM from 'ol/source/OSM';
import 'ol/interaction';
import {MapDataService} from '../../map-data.service';
import {Subscription} from 'rxjs';

interface MapServiceSubscriptions {
  addVehicles: Subscription;
  clearVehicles: Subscription;
  activateVehicle: Subscription;
  addVehicleTrack: Subscription;
  clearVehicleTrack: Subscription;
  markerChanges: Subscription;
}

@Component({
  selector: 'app-open-street-map',
  templateUrl: './open-street-map.component.html',
  styleUrls: ['./open-street-map.component.css'],
})
export class OpenStreetMapComponent implements OnInit {

  map: OsMap;
  markers;

  center: object;
  subscription: MapServiceSubscriptions = {
    addVehicles: null,
    clearVehicles: null,
    activateVehicle: null,
    addVehicleTrack: null,
    clearVehicleTrack: null,
    markerChanges: null,
  };

  constructor(private mapData: MapDataService) {
    this.center = {
      lat: 58.370568,
      lng: 26.715893,
    };

    this.subscription.addVehicles = mapData.vehiclesPositioned$.subscribe(
      vehs => {
        for (const v of vehs){
          this.addMarker(v[1].objectName, v[1].latitude, v[1].longitude);
        }
      });

    this.subscription.clearVehicles = mapData.vehiclesCleared$.subscribe(
      () => {

      });

    this.subscription.addVehicles = mapData.vehicleTrack$.subscribe(
      tracks => {

      });
    this.subscription.clearVehicleTrack = mapData.vehicleTracksCleared$.subscribe(
      () => {

      });

    this.subscription.activateVehicle = mapData.vehiclesActivated$.subscribe(
      (veh) => {
        this.center = {
          lat: veh.latitude,
          lng: veh.longitude,
        };
      });
  }

  addMarker(label: string, lon: number, lat: number){

  }

  ngOnInit(): void {
    this.map = new OsMap({
      target: 'os-map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 0
      }),
      controls: defaultControls(),
    });
    this.markers = new VectorLayer({
      source: new VectorSource({
        features: []
      }),
    });
    this.map.addLayer(this.markers);
  }

}
