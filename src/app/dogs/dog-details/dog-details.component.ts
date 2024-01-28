import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DogDetailsComponent implements OnInit {
  dog: any = {};
  defaultDate = '01-01-1970';
  constructor(private auth: AuthService) {
    // Récupération de l'URL
    let currentUrl = window.location.href;

    // Récupération de l'id de la balade
    let idDog: string = currentUrl.split('/').pop() || '';

    // Récupération de la balade
    this.auth.getDog$(idDog).subscribe((dog) => {
      this.dog = dog;
      let date = new Date(this.dog.birthdate);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.dog.birthdate = day + '-' + month + '-' + year;
    });
  }

  ngOnInit() {}
}
