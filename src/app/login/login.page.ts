import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';

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
    FormsModule,
  ],
})

export class LoginPage {
  email: string='';
  password: string='';

  constructor() {}

  signIn() {  
    // Ajoutez ici la logique de connexion en utilisant votre API
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Vous devrez appeler votre API ici pour effectuer le processus de connexion
  }
}
