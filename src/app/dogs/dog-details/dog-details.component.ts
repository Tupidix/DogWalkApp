import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

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
      this.dog = dog;
      let date = new Date(this.dog.birthdate);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.dog.birthdate = year + '-' + month + '-' + day;
    });
  }

  ngOnInit() {}
  saveAndRedirect() {
    // Récupération de l'URL
    let currentUrl = window.location.href;

    // Récupération de l'id du chien
    let idDog: string = currentUrl.split('/').pop() || '';

    this.auth.getId$().subscribe((userId) => {
      // Call the post method from the auth service
      this.auth.deleteDog$(idDog).subscribe(
        (response) => {
          // Handle the response here
          console.log('Le chien a été créée avec succès !');
          console.log(response);

          this.router.navigate(['/dogs']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          // Handle the error here
          console.log("Aie aie aie, il y a eu une erreur :'(");
          console.error(error);
        }
      );
    });
  }
}
