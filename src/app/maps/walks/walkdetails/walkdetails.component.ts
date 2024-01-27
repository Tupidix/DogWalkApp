import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-walkdetails',
  templateUrl: './walkdetails.component.html',
  styleUrls: ['./walkdetails.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WalkdetailsComponent implements OnInit {
  walk: any = {};
  user: any = {
    firstname: 'This user',
    lastname: "doesn't exist anymore",
  };

  constructor(private auth: AuthService) {
    // Récupération de l'URL
    let currentUrl = window.location.href;

    // Récupération de l'id de la balade
    let idWalk: string = currentUrl.split('/').pop() || '';

    // Récupération de la balade
    this.auth.getWalk$(idWalk).subscribe((walk) => {
      this.walk = walk;

      // Récupération de l'utilisateur (imbriqué sinon il fait une requête avant d'avoir l'id)
      this.auth.getUser$(this.walk.creator).subscribe((user) => {
        this.user = user;
      });
    });
  }

  ngOnInit() {}
}
