import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';

// Carte
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  defaultIcon,
  MyLocationIcon,
  trackingIcon,
} from '../../default-marker';

// Geolocalisation
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-walkerslist',
  templateUrl: './walkerslist.component.html',
  styleUrls: ['./walkerslist.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule],
})
export class WalkerslistComponent implements OnInit {
  allUsers: any[] = [];

  map: Map | null = null;
  mapOptions: MapOptions;

  mapMarkers: any = [];

  info = '';

  constructor(private auth: AuthService) {
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

    // this.mapMarkers = [
    //   marker([46.7813058, 6.6473608], { icon: defaultIcon }).bindTooltip(
    //     'We were created with ❤️ here !'
    //   ),
    // ];
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

  patchUserLocation(userLocation: any) {
    // On proftie de la géolocalisation pour mettre à jour la position de l'utilisateur avec un Patch sur l'API

    this.auth.getId$().subscribe((id) => {
      const user = {
        localisation: {
          type: 'Point',
          coordinate: [userLocation.lat, userLocation.lng],
        },
        id: id,
      };

      this.auth.patchUser$(user).subscribe(
        (response) => {
          // Handle the response here
          console.log('Modifié avec succès !');
          console.log(response);
          this.info = 'Votre position a été mise à jour';
        },
        (error) => {
          // Handle the error here
          console.log("Aie aie aie, il y a eu une erreur :'(");
          console.error(error);
        }
      );
    });
  }

  ngOnInit() {
    // this.auth.getToken$().subscribe((token) => {
    //   console.log('token: ' + token);
    // });
    this.auth.getAllUsers$().subscribe((users) => {
      this.allUsers = users;
    });

    // Geolocation.getCurrentPosition().then((position) => {
    //   const userLocation = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };

    //   this.patchUserLocation(userLocation);
    // });
  }
}
