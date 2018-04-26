import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './opentok.service';
import * as OT from '@opentok/client';
import {GeoLocationService} from './geo-location.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css'],
  providers: [ OpentokService, GeoLocationService, DataService ]
})
export class VideoChatComponent implements OnInit {
  title = 'Video Component';
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  lat: any;
  long: any;


  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService,
              private geoLocationService: GeoLocationService) {
    this.changeDetectorRef = ref;
  }

  ngOnInit () {
    this.opentokService.initSession().then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', (event) => {
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      this.session.on('streamDestroyed', (event) => {
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();
        }
      });
    })
      .then(() => this.opentokService.connect())
      .catch((err) => {
        console.error(err);
        alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
      });
    const source = this.geoLocationService.getLocation({enableHighAccuracy: true, maximumAge: 60000, timeout: 27000});
    source.subscribe(pos => {
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;
    }, err => {
      console.log(err);
    });
  }
}
