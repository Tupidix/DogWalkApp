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
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { defaultIcon } from './default-marker';

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
  map: Map | null = null;
  mapOptions: MapOptions;

  mapMarkers: Marker[];

  constructor() {
    this.getUserLocation();

    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          noWrap: true, // Pour éviter de prendre la carte dans le cache du navigateur
        }),
      ],
      zoom: 14, // Géré plus bas dans getUserLocation()
      center: latLng(46.7813058, 6.6473608), // Utile si la géolocalisation ne fonctionne pas
    };

    this.mapMarkers = [
      marker([46.7813058, 6.6473608], { icon: defaultIcon }).bindTooltip(
        'We were created with ❤️ here !'
      ),
    ];
  }

  onMapReady(map: Map) {
    this.map = map;
    // Event lisstener sur un mouvement de carte je laisse là, pourrait toujours être utile
    // this.map.on('moveend', () => {
    //   if (this.map) {
    //     const center = this.map.getCenter();
    //     console.log(`Map moved to ${center.lng}, ${center.lat}`);
    //   }
    // });

    // N'est plus nécessaire à voir selon les exemples de code et en plus j'ai mis le noWrap à true
    setTimeout(() => map.invalidateSize(), 0);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map?.setView(userLocation, 14); // 13 est le niveau de zoom
      });
    } else {
      console.log('Nous mettrons une localisation par défaut ici');
    }
  }
}
