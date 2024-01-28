import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { FormsModule, NgForm } from "@angular/forms";
import { NgIf } from '@angular/common';
import {NgModel} from "@angular/forms";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon,
    ExploreContainerComponent,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon,
    FormsModule,
    NgIf,
  ],
})

export class ProfilePage implements OnInit {
  "firstname": string;
  "lastname": string;
  "email": string;
  "password": string;
  "birthdate": Date;
  "displayInfo": string;

  displayJSON(form: NgForm) {
    if (form.valid) {
    this.displayInfo = '{"firstname": "'+ this.firstname + '", "lastname": "' + this.lastname + '", "email": "' + this.email + '", "password": "' + this.password + '", "birthdate": "' + this.birthdate + '"}';
    console.log(this.displayInfo);
    }
  }

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
  ) {}

  ngOnInit() {}

  // Add a method to log out.
  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
