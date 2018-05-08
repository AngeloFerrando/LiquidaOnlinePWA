import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
})
export class CamComponent {
  stream: MediaStream;
  @ViewChild('videoElement') videoElement: any;

  hidden = true;
  front = false;

  takeSnapshot() {
    const img = document.querySelector('img') || document.createElement('img');
    let context;
    let canvas;
    const video = document.getElementById('camera');
    // Choose picture size (can be video width/height
    const width = 300, height = 200;

    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    img.src = canvas.toDataURL('image/png'); // sarà da inserire all'interno del blob breeze per upload
    document.body.appendChild(img);
  }

  play() {
    // document.getElementById('container-camera')
    this.hidden = false;

    const constraint = {
      audio: true,
      video: {facingMode: (this.front ? 'user' : 'environment')}
      /* Better Settings
       width: { min: 1024, ideal: 1280, max: 1920 }
       Front/Rear Camera
       var front = false;
       document.getElementById('flip-button').onclick = function() { front = !front; };
       var constraints = { video: { facingMode: (front? "user" : "environment") } };
       Adjust Framerate
       video: { frameRate: { ideal: 10, max: 15 } }
       */
    };

    // How to show in fullscreen
    // document.getElementById('camera').webkitRequestFullScreen();
    document.getElementById('container-camera').style.width = '50vw';
    document.getElementById('container-camera').style.height = '50vh';
    this.startRecording(constraint);
    // this.startRecording({ video: true, audio: true, maxLength: 10, debug: true });
  }

  startRecording(config) {
    const browser = <any>navigator;
     const getUserMedia = (browser.getUserMedia || browser.webkitGetUserMedia || browser.mozGetUserMedia || browser.msGetUserMedia);
    if (browser.mediaDevices && getUserMedia) {
      browser.mediaDevices.getUserMedia(config)
        .then(stream => {
          // const videoTracks = stream.getVideoTracks();
          this.stream = stream;
          const video: HTMLVideoElement = this.videoElement.nativeElement;
          // video.id = 'camera';
          // video.src = window.URL.createObjectURL(stream); // deprecated
          video.srcObject = stream;
          // document.getElementById('camera').webkitRequestFullScreen();
          // video.addEventListener('click', this.takeSnapshot);
          // Set button to take a picture
          document.getElementById('Take_Picture').addEventListener('click', this.takeSnapshot);
          // Enable the other buttons
          (<HTMLInputElement> document.getElementById('Take_Picture')).disabled = false;
          (<HTMLInputElement> document.getElementById('Stop_Stream')).disabled = false;
          video.play();
        })
        .catch(function (err) {
          alert('Permission Denied');
        });
    } else {
      alert('Video is not supported');
    }
  }

  stop() {
    this.hidden = true;
    const stream = this.stream;
    if (stream) {
      stream.getTracks().forEach(function (track) { track.stop(); });
    }
    // stream.stop(); // da qualche problema
    (<HTMLInputElement> document.getElementById('Take_Picture')).disabled = true;
    (<HTMLInputElement> document.getElementById('Stop_Stream')).disabled = true;
    // stream.getAudioTracks().forEach(track => track.stop());
    // stream.getVideoTracks().forEach(track => track.stop());
  }


}

