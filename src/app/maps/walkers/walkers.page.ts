import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-walkers',
  templateUrl: './walkers.page.html',
  styleUrls: ['./walkers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WalkersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
