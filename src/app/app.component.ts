import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons'
import {navigateCircleOutline,  personOutline, pawOutline, arrowBackOutline} from 'ionicons/icons'
import { Storage } from "@ionic/storage-angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(storage: Storage) {
    storage.create();
    addIcons({navigateCircleOutline, personOutline, pawOutline, arrowBackOutline})
  }
}
