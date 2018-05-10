import {Routes} from '@angular/router';
import {VideoChatComponent} from './video-component/video-chat.component';
import {LoginComponent} from './login/login.component';
import {AutoperiziaComponent} from './autoperizia/autoperizia.component';
import {PhotoComponent} from './cam/photo/photo.component';

export const routes: Routes = [
  {
    path: 'video-chat',
    component: VideoChatComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'autoperizia',
    component: AutoperiziaComponent
  },
  {
    path: 'photo_test',
    component: PhotoComponent
  }
];
