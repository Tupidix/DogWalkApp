import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
} from '@ionic/angular/standalone';
  import { IonInput } from '@ionic/angular/standalone';
  import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonInput,
    IonTitle,
    IonItem,
    IonContent,
    IonButton,
  ],
})
export class LoginPage {
  constructor() {}
}
