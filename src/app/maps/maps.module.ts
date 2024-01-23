import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MapsPage } from './maps.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapsPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MapsPage,
      },
    ]),
    LeafletModule,
  ],
})
export class MapsPageModule {}
