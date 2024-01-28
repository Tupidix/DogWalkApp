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
  myId: string = '';

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.getId$().subscribe((id) => {
      this.myId = id;
      this.auth.getAllDogs$().subscribe((dogs) => {
        this.allDogs = dogs;
        console.log(this.allDogs);
        this.allDogs.forEach((dog: any) => {
          if (dog.master.includes(this.myId)) {
            this.yourDogs.push(dog);
          }
        });
      });
    });
  }
}

//   ngOnInit() {
//     let myID = this.auth.getMyID();
//     this.auth.getAllDogs$().subscribe((dogs) => {
//       this.allDogs = dogs;
//       console.log('this.allDogs');
//       console.log(this.allDogs);

//       this.allDogs.forEach((dog: any) => {
//         console.log('la je passe');
//         console.log(myID);
//         if (dog.master.includes(myID)) {
//           console.log('chien rajouté');
//           this.yourDogs.push(dog);
//         }
//       });
//     });
//   }
// }
