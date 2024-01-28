import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';

// Logout
import { AuthService } from "src/app/security/auth.service";


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
    IonButtons,
    FormsModule,
    NgIf,
  ],
})

export class RegisterPage {
"firstname": string;
"lastname": string;
"email": string;
"password": string;
"birthdate": Date;
"displayInfo": string;

constructor(){
}

  displayJSON(form: NgForm) {
    if (form.valid) {
    this.displayInfo = '{"firstname": "'+ this.firstname + '", "lastname": "' + this.lastname + '", "email": "' + this.email + '", "password": "' + this.password + '", "birthdate": "' + this.birthdate + '"}';
    console.log(this.displayInfo);
    }
  }
}
