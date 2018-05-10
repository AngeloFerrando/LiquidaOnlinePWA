import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MapsAPILoader} from '@agm/core';

declare var google: any;

@Injectable()
export class GeoLocationService {

  constructor(private _loader: MapsAPILoader) { }

  getLocation(opts): Observable<any> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.watchPosition((position) => {
          observer.next(position); console.log(position);
        }, (error) => {
          switch (error.code) {
            case 1:
              observer.error('errors.location.permissionDenied');
              break;
            case 2:
              observer.error('errors.location.positionUnavailable');
              break;
            case 3:
              observer.error('errors.location.timeout');
              break;
          }
        }, opts);
      } else {
        observer.error('errors.location.unsupportedBrowser');
      }
    });
  }

  getAddress(lat: number, lng: number, callback: ((address: string) => void)) {
    if (navigator.geolocation) {
      this._loader.load().then(() => {
          const geocoder = new google.maps.Geocoder();
          const latlng = new google.maps.LatLng(lat, lng);
          const request = {latLng: latlng};

          geocoder.geocode(request, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              const result = results[0];
              // let rsltAdrComponent = result.address_components;
              // let resultLength = rsltAdrComponent.length;
              callback(result.formatted_address);
            }
          });
        }
      );
    }
  }
}
