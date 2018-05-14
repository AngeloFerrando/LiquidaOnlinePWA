import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './services/opentok.service';
import * as OT from '@opentok/client';
import {DataService} from './services/dataService/data.service';
import {Entity, EntityManager, FilterQueryOp} from 'breeze-client';
import {BizFilter} from './services/dataService/bizFilter';
import {BizStream} from './services/dataService/bizStream';


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

      const myData: Entity[] = [];
      let descrizione: string;
      const stream = new BizStream();
      stream.addFilter(new BizFilter('Codice', FilterQueryOp.Equals.toString(), this.PIN, '1'));
      console.log('second call');
      this.dataService.getEntitiesByStream('DossierNominativi', stream, context, data1 => {
        for (const entity of data1) {
          myData.push(entity);
          descrizione = entity['Descrizione'];
          console.log(entity);
          this.createAttachment(context, entity);
        }
      });
    });
  }

  createAttachment(context: EntityManager, nominativo: Entity) {
    console.log('createAttachment called');
    /* Livello per video-perizia */
    const path = 'UploadFile/' + 'DOSSIER/' + nominativo['Dossier']['Riferimento'] + '/DOSSIERNOMINATIVO/' + nominativo['Descrizione'];
    console.log('path created: ' + path);
    const attachment: Entity = this.dataService.addEntity('Allegato', {}, context);
    attachment['TipoEntita'] = 'DOSSIERNOMINATIVO';
    attachment['IDEntita'] = nominativo['ID'];
    attachment['Descrizione'] = 'testo libero';
    attachment['NomeFile'] = 'filename';
    attachment['DataGPS'] = new Date();
    attachment['Percorso'] = path;
    attachment['Latitudine'] = 23.989878;
    attachment['Longitudine'] = 97.989867;
    attachment['MemorizzaContenuto'] = false; /* sempre false - così cancella blob e salvafile su filesystem */
    /* attachment['Barcode'] = 'agdshdfdshg'; */
    /* attachment['File'] = binary_image (blob) - [1,5] MB max*/
    console.log('attachment created');
    context.saveChanges();
    console.log('attachment saved');

    console.log('createAttachment finished');
  }

}
