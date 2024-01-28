import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-dog-update',
  templateUrl: './dog-update.component.html',
  styleUrls: ['./dog-update.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DogUpdateComponent implements OnInit {
  dog: any = {};
  defaultDate = '01-01-1970';
  constructor(private auth: AuthService) {
    // Récupération de l'URL
    let currentUrl = window.location.href;

    // Récupération de l'id du chien
    let idDog: string = currentUrl.split('/').pop() || '';

    // Récupération du chien
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
