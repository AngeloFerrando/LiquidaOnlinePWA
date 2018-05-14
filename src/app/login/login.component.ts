import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DataService} from '../services/dataService/data.service';
import config from '../../config';
import {EntityManager, config as breezeConfig, FilterQueryOp, Entity} from 'breeze-client';
import {BizFilter} from '../services/dataService/bizFilter';
import {BizStream} from '../services/dataService/bizStream';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ DataService ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('loginModal') public showModalOnClick: any;

  public showModal(): void {

    this.showModalOnClick.show();

  }

  constructor(private dataService: DataService) {
  }

  ngAfterViewInit() {
    this.showModal();
  }

  login(name: string, surname: string, PIN: number) {
    console.log('login function called with parameters: ' + name + ', ' + surname + ', ' + PIN);
    try {
      const context: EntityManager = new EntityManager(config.SAMPLE_SERVER_BASE_URL);

      this.dataService.getEntitiesParamBinary(
        'LoginGuest',
        ({nome: name, cognome: surname, PIN: PIN}),
        context, data => {
          console.log('Callback started');
          // get the current default Breeze AJAX adapter
          const ajaxAdapter: any = breezeConfig.getAdapterInstance('ajax');
          console.log(data[0]);

          // set fixed headers
          ajaxAdapter.defaultSettings = {
            headers: {
              'Authorization': data[0]
            }
          };
        });
    } catch (e) {
      console.log('Exception: ' + e);
    }
  }

}

