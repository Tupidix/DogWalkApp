import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-walks',
  templateUrl: './walks.page.html',
  styleUrls: ['./walks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WalksPage implements OnInit {
  allWalks: any[] = [];

  constructor(
    // Inject the authentication provider.
    private auth: AuthService
  ) {}

  ngOnInit() {
    // this.auth.getToken$().subscribe((token) => {
    //   console.log('token: ' + token);
    // });
    this.auth.getAllWalks$().subscribe((walks) => {
      this.allWalks = walks;

      // Temporaire, prendre les 5 premiers résultats
      if (walks.length > 5) {
        this.allWalks = this.allWalks.slice(0, 5);
      }

      // this.allWalks.forEach((walk) => {
      //   console.log(walk);
      // });
    });
  }
}
