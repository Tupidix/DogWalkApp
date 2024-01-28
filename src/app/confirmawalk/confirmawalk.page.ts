import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

// Carte
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { defaultIcon, trackingIcon, arrivalIcon } from '../maps/default-marker';

@Component({
  selector: 'app-confirmawalk',
  templateUrl: './confirmawalk.page.html',
  styleUrls: ['./confirmawalk.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule],
})
export class ConfirmawalkPage implements OnInit {
  map: Map | null = null;
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  positions: any = [];
  departureHours: number | string = 0;
  departureMinutes: number | string = 0;

  hours: number | string = 0;
  minutes: number | string = 0;

  distanceTraveled: number = 0;

  inputValue: string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private auth: AuthService
  ) {
    this.mapOptions = {};

    this.mapMarkers = [
      marker([46.7813058, 6.6473608], { icon: defaultIcon }).bindTooltip(
        'We were created with ❤️ here !'
      ),
    ];
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
    this.positions = this.dataService.getData();
    this.departureHours = this.dataService.getHours();
    this.departureMinutes = this.dataService.getMinutes();
    this.distanceTraveled = this.dataService.getDistance();

    // Prendre l'hours actuelle
    this.hours = new Date().getHours();
    // Prendre les minutes actuelles
    this.minutes = new Date().getMinutes();

    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;

    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          noWrap: true, // Pour éviter de prendre la carte dans le cache du navigateur
        }),
      ],
      zoom: 14, // Géré plus bas dans getUserLocation()
      center: latLng(
        this.positions[this.positions.length - 1].lat,
        this.positions[this.positions.length - 1].lng
      ), // Utile si la géolocalisation ne fonctionne pas
    };

    this.positions.forEach((position: any) => {
      this.mapMarkers.push(
        marker([position.lat, position.lng], { icon: trackingIcon })
      );
    });

    this.mapMarkers.push(
      marker(
        [
          this.positions[this.positions.length - 1].lat,
          this.positions[this.positions.length - 1].lng,
        ],
        { icon: arrivalIcon }
      )
    );
  }

  saveAndRedirect() {
    this.auth.getId$().subscribe((userId) => {
      // Collect the necessary data
      const walkData = {
        title: this.inputValue,
        path: this.positions.map((position: any) => ({
          type: 'Point',
          coordinate: [position.lat, position.lng],
        })),
        creator: userId,
      };

      console.log('userID : ' + userId);

      // Call the post method from the auth service
      this.auth.postWalk$(walkData).subscribe(
        (response) => {
          // Handle the response here
          console.log('La balade a été créée avec succès !');
          console.log(response);
        },
        (error) => {
          // Handle the error here
          console.log("Aie aie aie, il y a eu une erreur :'(");
          console.error(error);
        }
      );
      this.router.navigate(['/maps/walks']);
    });
  }
}
