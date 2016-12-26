import { Component } from '@angular/core';
import {Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,
  GoogleMapsMarkerOptions, GoogleMapsMarker, Toast} from 'ionic-native';
import { NavController, Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  latLng: any;

  constructor(public navCtrl: NavController, private platform: Platform) {
  platform.ready().then(() => {
      this.getCurrentPosition();
  });
}

getCurrentPosition(){
  Geolocation.getCurrentPosition()
    .then(position => {

      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      this.latLng = new GoogleMapsLatLng(lat, lng)

      this.loadMap();
  });
}

loadMap(){
  this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
      'compass': true,
      'myLocationButton': true,
      'indoorPicker': true,
      'zoom': true,
    },
    'gestures': {
      'scroll': true,
      'tilt': true,
      'rotate': true,
      'zoom': true
    },
    'camera': {
      'latLng': this.latLng,
      'tilt': 30,
      'zoom': 15,
      'bearing': 50
    }
  });

  this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    console.log('Map is ready!');
    this.setMarker();
  });
}

setMarker(){
  //primero validamos que tengamos los datos de la localización
  if(this.latLng){

    //De esta forma estamos colocando el marker en la posicion de nuestra ubicación, con el titulo ‘Mi posición’
    let markerOptions: GoogleMapsMarkerOptions = {
      position: this.latLng,
      title: 'Mi posición'
    };

    //Luego lo agregamos al mapa, y una vez agregado llamamos la función showInfoWindow() para mostrar el título señalado anteriormente.

    this.map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
    });
  }else{

    //En caso de no obtener la ubicación es bueno señalar al usuario porque no se mostró el marker
    Toast.show("No se ha podido obtener su ubicación", '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}

}
