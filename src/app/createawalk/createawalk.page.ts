import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

// Carte
import {
  latLng,
  MapOptions,
  tileLayer,
  Map,
  marker,
  Marker,
  LatLngExpression,
} from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MyLocationIcon, trackingIcon } from '../maps/default-marker';
import { haversine_distance } from '../utils';

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
  positions: Array<{ lat: number; lng: number }> = [];

  distanceTraveled: number = 0;
  positionsPourDistance: Array<{ lat: number; lng: number }> = [];

  hours: number | string;
  minutes: number | string;

  map: Map | null = null;
  mapOptions: MapOptions;

  mapMarkers: Marker[] = [];
  isModalOpen = false;

  noPoint: number = 1;

  currentPosition: any = {};

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private router: Router, private dataService: DataService) {
    // Prendre l'heure actuelle
    this.hours = new Date().getHours();
    // Prendre les minutes actuelles
    this.minutes = new Date().getMinutes();

    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;

    // this.getUserLocation();

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

  ngOnInit() {
    this.watchPosition();
  }

  watchPosition(): void {
    Geolocation.watchPosition({ enableHighAccuracy: true }, (position) => {
      console.log('watchPosition');
      if (position) {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        /*
        TOUTE LA PARTIE CALCUL DE DISTANCE
        */
        if (this.positionsPourDistance.length == 0) {
          this.positionsPourDistance.push(this.currentPosition);
        } else if (
          this.positionsPourDistance[this.positionsPourDistance.length - 1]
            .lat !== this.currentPosition.lat ||
          this.positionsPourDistance[this.positionsPourDistance.length - 1]
            .lng !== this.currentPosition.lng
        ) {
          this.distanceTraveled =
            (Math.round(
              this.distanceTraveled +
                haversine_distance(
                  this.positionsPourDistance[
                    this.positionsPourDistance.length - 1
                  ],
                  this.currentPosition
                )
            ) /
              1000) *
            1000;
          this.positionsPourDistance.push(this.currentPosition);
        }

        console.log('this.positionsPourDistance');
        console.log(this.positionsPourDistance);

        /*
        FIN DE LA PARTIE CALCUL DE DISTANCE */

        // Si c'est la première position on centre la carte sur la position actuelle et$
        // on ajoute un marqueur et on ajoute la position dans le tableau
        //(on pourrait également le faire plus bas avec le if lastPosition)
        if (this.positions.length == 0) {
          this.map?.setView(this.currentPosition, 14); // 14 est le niveau de zoom
          this.mapMarkers.push(
            marker([this.currentPosition.lat, this.currentPosition.lng], {
              icon: MyLocationIcon,
            }).bindTooltip('Your beginning position')
          );
          this.positions.push(this.currentPosition);
        } else {
          // Lorsque la position change ajoute un marqueur
          // ce n'est pas pour autant que l'on ajoute la position dans le tableau pour stocker dans la BD
          // Mais on a stocké dans le tableau qui sert à calculer la distance parcourue
          this.mapMarkers.push(
            marker([this.currentPosition.lat, this.currentPosition.lng], {
              icon: trackingIcon,
            }).bindTooltip(this.noPoint++ + ' from start position')
          );

          const lastPosition = this.positions[this.positions.length - 1];

          // Si la dernière position est à plus de 30 mètres de la position actuelle alors on l'ajoute dans le tableau
          if (
            lastPosition &&
            haversine_distance(lastPosition, this.currentPosition) >= 30
          ) {
            this.positions.push(this.currentPosition);
            console.log('Position ajoutée car différence de minimum 30 mètres');
          }
        }
      }
    });
  }

  centerMap() {
    console.log('centerMap');
    // Get the current position of the device

    this.map?.setView(this.currentPosition);
  }

  stopWatchingAndSendToNextPage() {
    this.positions.push(this.currentPosition);
    console.log(this.positions);
    this.dataService.setData(this.positions);
    this.dataService.setHours(this.hours);
    this.dataService.setMinutes(this.minutes);
    this.dataService.setDistance(this.distanceTraveled);
    this.router.navigate(['/confirmawalk']);
  }
}
