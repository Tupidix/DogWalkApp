import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-walks',
  templateUrl: './walks.page.html',
  styleUrls: ['./walks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WalksPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
