import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { shuffle } from 'ionicons/icons';

@Component({
  selector: 'app-walkers',
  templateUrl: './walkers.page.html',
  styleUrls: ['./walkers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WalkersPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
