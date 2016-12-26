import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Hotspot } from "../../models/hotspot.model";
/*
  Generated class for the GoogleMaps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;

@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html'
})
export class GoogleMapsPage {

    @ViewChild("map") mapElement: ElementRef;
    map: any;
    private hotspots: Hotspot[];

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        this.hotspots = [
            { lng: 47.07135311, lat: 15.43756396, label: "H&M Graz Hauptplatz" },
            { lng: 47.07062603, lat: 15.43858856, label: "Rathaus Graz"},
            { lng: 43.0741904, lat: -89.3809802, label: "Ionic"}
        ];
        this.loadMap();
        this.addDummyMarkers();
    }

    loadMap(): void {
        let latLng = new google.maps.LatLng(43.0741904,-89.3809802);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }

    addDummyMarkers(): void {
        this.hotspots.forEach(x => {
            let latLng = new google.maps.LatLng(x.lng, x.lat);
            let marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: x.label
            });
        });
    }
}
