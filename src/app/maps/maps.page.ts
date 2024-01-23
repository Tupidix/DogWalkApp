import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonLabel,
  IonSegmentButton,
  IonItem,
  IonListHeader,
  IonList,
  IonButton,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RouterModule } from '@angular/router';

// Carte
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map } from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonItem,
    IonListHeader,
    IonList,
    IonButton,
    RouterModule,
    IonRouterOutlet,
    LeafletModule,
  ],
})
// export class MapPage implements AfterViewInit {
export class MapsPage {
  mapOptions: MapOptions;

  constructor() {
    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          noWrap: true, // Pour éviter de prendre la carte dans le cache du navigateur
        }),
      ],
      zoom: 15,
      center: latLng(46.7813058, 6.6473608),
    };
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }
}
