import {Component, ElementRef, AfterViewInit, ViewChild, Input, HostListener} from '@angular/core';
import { OpentokService } from '../../services/opentok.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})

export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;

  constructor(private opentokService: OpentokService) {
    this.publishing = false;
  }

  ngAfterViewInit() {
    /*document.getElementById('publisherDiv').style.width = '100%';
    document.getElementById('publisherDiv').style.height = '100%';*/
    console.log(window.innerWidth);
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
      insertMode: 'append',
      width: (0.6 * window.innerWidth),
      height: (0.4 * window.innerWidth)
    } );
    if (this.session) {
      if (this.session['isConnected']()) {
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());

      /* test to disable video (just in case)
      setTimeout(() => this.publisher.publishVideo(false), 5000);
      setTimeout(() => this.publisher.publishVideo(true), 10000);*/

    }
  }

  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
  }

}
