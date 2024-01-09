import { Component } from '@angular/core';
import { IonIcon} from '@ionic/angular/standalone';
import { IonButton} from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem
} from '@ionic/angular/standalone'
import { IonInput } from '@ionic/angular/standalone';;


@Component({
  selector: 'app-tab1',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButton,
    IonInput,
    IonItem,
  ],
})
export class RegisterPage {
  constructor() {}
}
