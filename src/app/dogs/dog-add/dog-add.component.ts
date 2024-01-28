import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'dog-add',
  templateUrl: './dog-add.component.html',
  styleUrls: ['./dog-add.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DogAddComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
