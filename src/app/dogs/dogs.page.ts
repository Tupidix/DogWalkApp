import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { filter, switchMap } from 'rxjs';
import { isDefined } from '../utils';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.page.html',
  styleUrls: ['./dogs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DogsPage implements OnInit {
  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
  ) {}

  ngOnInit() {
    this.auth
      .getId$()
      .pipe(
        filter(isDefined),
        switchMap((id) => this.auth.getAllDogs$(id))
      )
      .subscribe((dogs) => {
        localStorage.setItem('dogs', JSON.stringify(dogs));
        console.dir(dogs);
      });
  }
}
