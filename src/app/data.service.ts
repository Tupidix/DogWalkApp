import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: any;

  hours: number | string = 0;

  minutes: number | string = 0;

  distance: number = 0;

  setData(data: any) {
    this.data = data;
  }

  setHours(hours: number | string) {
    this.hours = hours;
  }

  setMinutes(minutes: number | string) {
    this.minutes = minutes;
  }

  setDistance(distance: number) {
    this.distance = distance;
  }

  getData(): any {
    return this.data;
  }

  getHours() {
    return this.hours;
  }

  getMinutes() {
    return this.minutes;
  }

  getDistance() {
    return this.distance;
  }
}
