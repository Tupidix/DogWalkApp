import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'dog-add',
  templateUrl: './dog-add.component.html',
  styleUrls: ['./dog-add.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DogAddComponent implements OnInit {
  dogName: string = '';
  dogBirthdate: string = '';
  dogBreed: string = '';
  dogPicture: string = '';
  dogMaster: string = '';
  constructor(
    private dataService: DataService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  saveAndRedirect() {
    this.auth.getId$().subscribe((userId) => {
      // Collect the necessary data

      let date = new Date(this.dogBirthdate);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.dogBirthdate = year + '-' + month + '-' + day;

      const dogData = {
        name: this.dogName,
        birthdate: this.dogBirthdate,
        breed: this.dogBreed,
        master: localStorage.getItem('id'),
        picture: this.dogPicture,
      };

      console.log('master : ' + dogData.master);

      // Call the post method from the auth service
      this.auth.postDog$(dogData).subscribe(
        (response) => {
          // Handle the response here
          console.log('Le chien a été créée avec succès !');
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
