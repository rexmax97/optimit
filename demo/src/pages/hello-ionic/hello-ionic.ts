import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { GoogleMapsPage } from "../google-maps/google-maps";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private navCtrl: NavController) {
  }

  goToMap(): void {
    this.navCtrl.push(GoogleMapsPage);
  }
}
