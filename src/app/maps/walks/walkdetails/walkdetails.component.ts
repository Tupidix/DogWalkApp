import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';
import { haversine_distance } from 'src/app/utils';

// Carte
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  defaultIcon,
  MyLocationIcon,
  trackingIcon,
  arrivalIcon,
} from '../../default-marker';

@Component({
  selector: 'app-walkdetails',
  templateUrl: './walkdetails.component.html',
  styleUrls: ['./walkdetails.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule],
})
export class WalkdetailsComponent implements OnInit {
  walk: any = {};
  user: any = {
    firstname: 'This user',
    lastname: "doesn't exist anymore",
  };

  nouveauFormatCoordonnees: any = [];

  distance: number = 0;

  map: Map | null = null;
  mapOptions: any = {};

  mapMarkers: Marker[] = [];

  constructor(private auth: AuthService) {
    // Récupération de l'URL
    let currentUrl = window.location.href;

    // Récupération de l'id de la balade
    let idWalk: string = currentUrl.split('/').pop() || '';

    // Récupération de la balade
    this.auth.getWalk$(idWalk).subscribe((walk) => {
      this.walk = walk;

      this.walk.path.forEach((element: any) => {
        this.nouveauFormatCoordonnees.push({
          lat: element.coordinate[0],
          lng: element.coordinate[1],
        });

        this.mapMarkers.push(
          marker([element.coordinate[0], element.coordinate[1]], {
            icon: trackingIcon,
          })
        );

        console.log(this.nouveauFormatCoordonnees);

        // Calcul de la distance
        if (this.nouveauFormatCoordonnees.length > 1) {
          this.distance =
            (Math.round(
              this.distance +
                haversine_distance(
                  this.nouveauFormatCoordonnees[
                    this.nouveauFormatCoordonnees.length - 2
                  ],
                  this.nouveauFormatCoordonnees[
                    this.nouveauFormatCoordonnees.length - 1
                  ]
                )
            ) /
              1000) *
            1000;
          console.log(this.distance);
        }
      });

      // Récupération de l'utilisateur (imbriqué sinon il fait une requête avant d'avoir l'id)
      this.auth.getUser$(this.walk.creator).subscribe((user) => {
        this.user = user;
      });
    });

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

  ngOnInit() {}
}
