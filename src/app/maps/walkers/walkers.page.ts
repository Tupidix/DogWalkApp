import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

// Carte
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { defaultIcon, MyLocationIcon } from '../default-marker';

@Component({
  selector: 'app-walkers',
  templateUrl: './walkers.page.html',
  styleUrls: ['./walkers.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    LeafletModule,
  ],
})
export class WalkersPage implements OnInit {
  map: Map | null = null;
  mapOptions: MapOptions;

  mapMarkers: Marker[];

  allWalkers: any[] = [];

  constructor(private auth: AuthService, private router: Router) {
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
    setTimeout(() => map.invalidateSize(), 100);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
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
      });
    } else {
      console.log('Nous mettrons une localisation par défaut ici');
    }
  }

  ngOnInit() {
    // this.auth.getToken$().subscribe((token) => {
    //   console.log('token: ' + token);
    // });
    this.auth.getAllUsers$().subscribe((walkers) => {
      this.allWalkers = walkers;

      // Temporaire, prendre les 5 premiers résultats
      if (walkers.length > 5) {
        this.allWalkers = this.allWalkers.slice(0, 5);
      }

      // this.allWalkers.forEach((walk) => {
      //   console.log(walk);
      // });
    });
  }
}
