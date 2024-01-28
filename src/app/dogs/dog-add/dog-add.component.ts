import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { DataService } from 'src/app/data.service';
import { ToastController } from '@ionic/angular';

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
    private router: Router,
    private auth: AuthService,
    private toastController: ToastController
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
        master: userId,
        picture: this.dogPicture,
      };

      console.log('master : ' + dogData.master);

      // Call the post method from the auth service
      this.auth.postDog$(dogData).subscribe(
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
