import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'google-maps-component',
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss'
})
export class GoogleMapsComponent implements OnInit {

  @Input() ChargingStationName: string = 'EV Station';
  @Output() latitudeEvent: EventEmitter<string> = new EventEmitter();
  @Output() longitudeEvent: EventEmitter<string> = new EventEmitter();



  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 16.511155726922123,
    lng: 81.55834699794315
  };
  zoom = 6;

  constructor() { }

  ngOnInit(): void {

  }


  dropMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = (event.latLng.toJSON());
      this.latitudeEvent.emit(this.center.lat.toString());
      this.longitudeEvent.emit(this.center.lng.toString());
    };
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }




}
