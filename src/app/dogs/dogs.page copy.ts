import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { filter, switchMap } from 'rxjs';
import { checkIfDogIsYours, isDefined } from '../utils';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.page.html',
  styleUrls: ['./dogs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DogsPage implements OnInit {
  allDogs: any = [];
  yourDogs: any = [];

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
  ) {}

  ngOnInit() {
    // Récupération de tout les chiens
    this.auth.getAllDogs$().subscribe((dogs) => {
      this.allDogs = dogs;
      console.log('this.allDogs');
      console.log(this.allDogs);

      setTimeout(() => {
        this.allDogs.forEach((dog: any) => {
          console.log('la je passe');
          if (dog.master === '65a6848515ca4e1874b5de14') {
            console.log(dog);
            console.log('chien rajouté');
            this.yourDogs.push(dog);
          }
        });
      }, 5000);
    });
  }
}
