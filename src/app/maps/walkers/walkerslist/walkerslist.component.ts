import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { shuffle } from 'ionicons/icons';

@Component({
  selector: 'app-walkerslist',
  templateUrl: './walkerslist.component.html',
  styleUrls: ['./walkerslist.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WalkerslistComponent implements OnInit {
  allUsers: any[] = [];

  constructor(
    // Inject the authentication provider.
    private auth: AuthService
  ) {}

  ngOnInit() {
    // this.auth.getToken$().subscribe((token) => {
    //   console.log('token: ' + token);
    // });
    this.auth.getAllUsers$().subscribe((users) => {
      this.allUsers = users;

      // Temporaire, prendre les 5 premiers résultats
      if (users.length > 5) {
        this.allUsers = this.allUsers.slice(0, 5);
      }

      // this.allUsers.forEach((user) => {
      //   console.log(user);
      // });
    });
  }
}
