import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: any; // Remplacez 'any' par le type de votre carte

  setMap(map: any) {
    this.map = map;
  }

  interactWithMap() {
    // Interagissez avec 'this.map' ici
  }
}
