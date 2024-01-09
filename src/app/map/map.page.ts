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
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

// Carte
import { AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
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
  ],
})
// export class MapPage implements AfterViewInit {
export class MapPage {
  constructor() {}

  // ngAfterViewInit() {
  //   this.initMap();
  // }

  // initMap() {
  //   const map = L.map('map').setView([46.7813058, 6.6473608], 13);

  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
  //     map
  //   );

  // Ajoute des marqueurs, lignes, ou autres éléments à la carte si nécessaire
} //}
