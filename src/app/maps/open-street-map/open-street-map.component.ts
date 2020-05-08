import {Component, OnInit} from '@angular/core';
import {Map as OsMap, View, Feature} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Point as GeomPoint} from 'ol/geom';
import {fromLonLat} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import OSM from 'ol/source/OSM';
import 'ol/interaction';


@Component({
  selector: 'app-open-street-map',
  templateUrl: './open-street-map.component.html',
  styleUrls: ['./open-street-map.component.css'],
})
export class OpenStreetMapComponent implements OnInit {

  map: OsMap;
  markers;

  constructor() {

  }

  addMarker(label: string, lon: number, lat: number){
    const feature = new Feature({
      geometry: new GeomPoint(fromLonLat([lon, lat]))
    });
    this.markers.getSource().addFeature(feature);
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
