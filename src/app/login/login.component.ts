import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('loginModal') public showModalOnClick: any;

  public showModal(): void {

    this.showModalOnClick.show();

  }

  constructor() {
  }

  ngAfterViewInit() {
    this.showModal();
  }

}

