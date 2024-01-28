import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-walkerdetails',
  templateUrl: './walkerdetails.component.html',
  styleUrls: ['./walkerdetails.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WalkerdetailsComponent implements OnInit {
  userDetails: any = {};
  allDogs: any[] = [];
  usersDogs: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private auth: AuthService
  ) {
    // Récupération de l'URL
    let currentUrl = window.location.href;

    // Récupération de l'id de l'utilisateur
    let id: string = currentUrl.split('/').pop() || '';
    console.log(id);

    this.auth.getUser$(id).subscribe((user) => {
      this.userDetails = user;
      console.log(this.userDetails);
    });

    this.auth.getAllDogs$().subscribe((dogs) => {
      this.allDogs = dogs;
      this.allDogs.forEach((dog: any) => {
        if (dog.master.includes(id)) {
          this.usersDogs.push(dog);
        }
      });
    });
    console.log(this.usersDogs);
  }
  ngOnInit() {}
}
