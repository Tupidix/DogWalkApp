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
firstname: string = "";
lastname: string = "";
email: string = "";
password: string = "";
birthdate: Date = new Date();
displayInfo: any = {};

  constructor(private auth: AuthService, private router: Router) { }

  // displayJSON(form: NgForm) {
  //   if (form.valid) {
  //   this.displayInfo = '{"firstname": "'+ this.firstname + '", "lastname": "' + this.lastname + '", "email": "' + this.email + '", "password": "' + this.password + '", "birthdate": "' + this.birthdate + '"}';
  //   console.log(this.displayInfo);
  //   } return this.displayInfo;
  // }

  saveAndRedirect(form: NgForm) {
    if (form.valid) {
      const myNewUser = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        birthdate: this.birthdate,
        picture: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      }
    
    // '{"firstname": "'+ this.firstname + '", "lastname": "' + this.lastname + '", "email": "' + this.email + '", "password": "' + this.password + '", "birthdate": "' + this.birthdate + '"}';
    // console.log(this.displayInfo);
    // }

    // Call the post method from the auth service
    this.auth.postUser$(myNewUser).subscribe(
      (response) => {
        // Handle the response here
        console.log('Le compte a été créée avec succès !');
        console.log(response);
        
        // Redirect to login page
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle the error here
        console.log("Aie aie aie, il y a eu une erreur :'(");
        console.error(error);
      }
    );

    }
  }
}