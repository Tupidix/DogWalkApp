import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonLabel,
  IonSegmentButton,
  IonItem,
  IonListHeader,
  IonList,
  IonButton,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonItem,
    IonListHeader,
    IonList,
    IonButton,
    RouterModule,
    IonRouterOutlet,
  ],
})
// export class MapPage implements AfterViewInit {
export class MapsPage {
  constructor() {}
}
