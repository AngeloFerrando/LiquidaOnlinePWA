import { Injectable } from '@angular/core';
import { DataService } from './dataService/data.service';
import { EntityManager, Entity, FilterQueryOp } from 'breeze-client';
import { BizStream } from './dataService/bizStream';
import { BizFilter } from './dataService/bizFilter';
import {BizSorter, SortDirection } from './dataService/bizSorter';

import * as OT from '@opentok/client';
import config from '../../config';

@Injectable()
export class OpentokService {

  session: OT.Session;
  token: string;

  constructor(private dataService: DataService) { }

  getOT() {
    return OT;
  }

  initSession(PIN: string) {
    if (config.API_KEY && config.TOKEN && config.SESSION_ID) {
      this.session = this.getOT().initSession(config.API_KEY, config.SESSION_ID);
      this.token = config.TOKEN;
      return Promise.resolve(this.session);
    } else {
      const context: EntityManager = new EntityManager(config.SAMPLE_SERVER_BASE_URL);
      return new Promise((resolve, reject) => {
        this.dataService.getEntitiesParam('GetSessioneByPin', ({ pin: PIN }), context, data => {
          const breezeSession: Entity = data[0];
          console.log(breezeSession);
          this.session = this.getOT().initSession(breezeSession['ApiKey'], breezeSession['SessionID']);
          this.token = breezeSession['Token'];
          resolve(this.session);
        });
      });

      /*
      return fetch(config.SAMPLE_SERVER_BASE_URL + '/session')
        .then((data) => data.json())
        .then((json) => {
          this.session = this.getOT().initSession(json.apiKey, json.sessionId);
          this.token = json.token;
          return this.session;
        });
        */
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
}
