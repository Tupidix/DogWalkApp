import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
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
  user: any = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    birthdate: '',
  };

  onSubmit(form: NgForm) {
    console.log(this.user._id);
    if (form.valid) {
      this.auth.updateUser$(this.user).subscribe((user) => {
        console.log(user);
      });
    }
  }

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
  ) {
    this.auth.getId$().subscribe((userId) => {
      this.auth.getUser$(userId).subscribe((user) => {
        this.user = user;
        console.log(this.user);
        this.user.birthdate = new Date(user.birthdate)
          .toISOString()
          .slice(0, 10);
      });
    });
  }

  ngOnInit() {}

  // Add a method to log out.
  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
