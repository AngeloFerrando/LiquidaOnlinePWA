import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PublisherComponent} from './video-component/publisher/publisher.component';
import {SubscriberComponent} from './video-component/subscriber/subscriber.component';
import {OpentokService} from './video-component/opentok.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {VideoChatComponent} from './video-component/video-chat.component';
import {routes} from './app.routing';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {BreezeBridgeHttpClientModule} from 'breeze-bridge2-angular';
import {HttpClientModule} from '@angular/common/http';

import 'hammerjs';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatNativeDateModule, MatOptionModule,
  MatSelectModule, MatStepperModule, MatToolbarModule
} from '@angular/material';
import {MenudemoComponent} from './menudemo/menudemo.component';
import {GeoLocationService} from './video-component/geo-location.service';
import {DataService} from './services/dataService/data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoperiziaComponent} from './autoperizia/autoperizia.component';
import {CamComponent} from './cam/cam.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PageBackgroundComponent} from './page-background/page-background.component';
import {LoginComponent} from './login/login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    SubscriberComponent,
    VideoChatComponent,
    MenudemoComponent,
    AutoperiziaComponent,
    CamComponent,
    NavbarComponent,
    PageBackgroundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    BreezeBridgeHttpClientModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
  ],
  providers: [OpentokService, GeoLocationService, DataService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}
