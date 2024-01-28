import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dog-update',
  templateUrl: './dog-update.component.html',
  styleUrls: ['./dog-update.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DogUpdateComponent implements OnInit {
  existingDog: any = {};

  dogName: string = '';
  dogBirthdate: string = '';
  dogBreed: string = '';
  dogMaster: string = '';
  dogDislikes: object[] = [];
  dogPicture: string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private auth: AuthService
  ) {
    // Récupération de l'URL
    let currentUrl = window.location.href;

    // Récupération de l'id du chien
    let idDog: string = currentUrl.split('/').pop() || '';

    // Récupération du chien
    this.auth.getDog$(idDog).subscribe((dog) => {
      this.existingDog = dog;

      let date = new Date(this.existingDog.birthdate);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      this.existingDog.birthdate = year + '-' + month + '-' + day;

      this.auth.getId$().subscribe((id) => {
        this.dogMaster = id;
      });
    });
  }

  ngOnInit() {}
  saveAndRedirect() {
    // Récupération de l'URL
    let currentUrl = window.location.href;
    // Récupération de l'id du chien
    let idDog: string = currentUrl.split('/').pop() || '';
    this.auth.getId$().subscribe((userId) => {
      const dogData = {
        name: !!this.dogName ? this.dogName : this.existingDog.name,
        birthdate: !!this.dogBirthdate
          ? this.dogBirthdate
          : this.existingDog.birthdate,
        breed: !!this.dogBreed ? this.dogBreed : this.existingDog.breed,
        master: this.existingDog.master,
        dislikes: this.existingDog.dislikes,
        picture: !!this.dogPicture ? this.dogPicture : this.existingDog.picture,
      };

      // Call the post method from the auth service
      this.auth.patchDog$(dogData, idDog).subscribe(
        (response) => {
          // Handle the response here
          console.log('Le chien a été modifié avec succès !');
          console.log(response);
        },
        (error) => {
          // Handle the error here
          console.log("Aie aie aie, il y a eu une erreur :'(");
          console.error(error);
        }
      );
      this.router.navigate(['/dogs']);
    });
  }
}
