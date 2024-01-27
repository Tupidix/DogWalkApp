import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Carte
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MyLocationIcon } from '../maps/default-marker';

// Geolocalisation
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-createawalk',
  templateUrl: './createawalk.page.html',
  styleUrls: ['./createawalk.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule],
})
export class CreateawalkPage implements OnInit {
  heure: number | string;
  minute: number | string;

  map: Map | null = null;
  mapOptions: MapOptions;

  mapMarkers: Marker[] = [];
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor() {
    // Prendre l'heure actuelle
    this.heure = new Date().getHours();
    // Prendre les minutes actuelles
    this.minute = new Date().getMinutes();

    this.heure = this.heure < 10 ? '0' + this.heure : this.heure;
    this.minute = this.minute < 10 ? '0' + this.minute : this.minute;

    this.getUserLocation();

    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          noWrap: true, // Pour éviter de prendre la carte dans le cache du navigateur
        }),
      ],
    };
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
    setTimeout(() => map.invalidateSize(), 100);
  }

  getUserLocation() {
    Geolocation.getCurrentPosition()
      .then((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map?.setView(userLocation, 14); // 13 est le niveau de zoom
        this.mapMarkers.push(
          marker([userLocation.lat, userLocation.lng], {
            icon: MyLocationIcon,
          }).bindTooltip('Your position')
        );
      })
      .catch((err) => {
        console.error('Error getting user location', err);
      });
  }

  ngOnInit() {}
}
