import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-walkers',
  templateUrl: './walkers.page.html',
  styleUrls: ['./walkers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WalkersPage implements OnInit {
  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
  ) {}

  ngOnInit() {
    // this.auth.getToken$().subscribe((token) => {
    //   console.log('token: ' + token);
    // });
    this.auth.getAllUsers$().subscribe((users) => {
      let allUsers = users;
      allUsers.forEach((user) => {
        console.log(user.firstname);
      });
    });
  }
}
