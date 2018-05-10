import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './services/opentok.service';
import * as OT from '@opentok/client';
import {DataService} from './services/dataService/data.service';
import {EntityManager} from 'breeze-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DataService ]
})
export class AppComponent implements OnInit {

  PIN: number;
  isValid: boolean;

  constructor(private dataService: DataService) {

  }

  ngOnInit () {

  }

  checkPIN() {
    console.log('checkPIN called');
    const context: EntityManager = new EntityManager('http://195.78.200.34/SmartClaimsApi/breeze/TC');

    this.dataService.getEntitiesParamBinary('ValidatePin', ({ pin: this.PIN }), context, data => {
      this.isValid = data[0];
    });
  }

}
