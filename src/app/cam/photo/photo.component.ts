import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']

})
export class PhotoComponent implements OnInit {
  stream: MediaStream;
  @ViewChild('videoElement') videoElement: any;

  hidden = false;
  front = false;
  preview_hidden = true;

  takeSnapshot() {
    this.preview_hidden = false;
    stop();

    const img: any = document.querySelector('#preview_img');
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

    img.src = canvas.toDataURL('image/png');
  }

  play() {
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

    this.startRecording(constraint);
  }

  switch() {
    this.front = !this.front;
    this.stop();
    this.play();
  }

  startRecording(config) {
    const browser = <any>navigator;
    const getUserMedia = (browser.getUserMedia || browser.webkitGetUserMedia || browser.mozGetUserMedia || browser.msGetUserMedia);
    if (browser.mediaDevices && getUserMedia) {
      browser.mediaDevices.getUserMedia(config)
        .then(stream => {
          this.stream = stream;
          const video: HTMLVideoElement = this.videoElement.nativeElement;
          // video.id = 'camera';
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          console.log(err);
          alert('Permission Denied');
        });
    } else {
      alert('Video is not supported');
    }
  }

  stop() {
    this.hidden = true;
    this.stream.getAudioTracks().forEach(track => track.stop());
    this.stream.getVideoTracks().forEach(track => track.stop());
  }

  ngOnInit(): void {
    this.play();
  }


}

