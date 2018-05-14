import {Component, OnInit, ViewChild} from '@angular/core';

declare var MediaRecorder: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']

})
export class VideoComponent implements OnInit {
  @ViewChild('videoElement') videoElement: any;
  videoPreview: any;

  /*
      Adjustable settings
   */
  video_duration = 2000; // in ms
  front_camera_default = false;
  /*
     END of Adjustable settings
  */
  stream: MediaStream;
  video: Blob = null;

  hidden = false;
  recording = false;
  front = this.front_camera_default;
  preview_hidden = true;
  mediaRecorder: any;

  startTakingVideo() {
    if (this.recording) {
      return;
    }
    this.recording = true;
    this.video = null;

    this.mediaRecorder = new MediaRecorder(this.stream);
    this.mediaRecorder.ondataavailable = (e) => {
      if (this.video !== null || this.mediaRecorder.state !== 'recording') {
        // already received the first chunk of video, discard the current one
        return;
      }
      this.video = e.data;
      this.stopTakingVideo();
    };

    this.mediaRecorder.onstop = (e) => {
      this.videoPreview.src = URL.createObjectURL(this.video);
      this.videoPreview.load();
      this.videoPreview.onloadeddata = () => this.videoPreview.play();
    };

    this.mediaRecorder.start(this.video_duration);
    console.log(this.mediaRecorder.state);
  }

  stopTakingVideo() {
    this.mediaRecorder.stop();
    this.recording = false;
    console.log(this.mediaRecorder.state);
  }

  switchCamera() {
    this.front = !this.front;
    this.stopCamera();
    this.startCamera();
  }



  startCamera() {
    this.hidden = false;

    const config = {
      audio: false,
      video: {
        facingMode: (this.front ? 'user' : 'environment'),
      }
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

    const browser = <any>navigator;
    const getUserMedia = (browser.getUserMedia || browser.webkitGetUserMedia || browser.mozGetUserMedia || browser.msGetUserMedia);
    if (!browser.mediaDevices || !getUserMedia) {
      alert('Video is not supported');
      return;
    }

    browser.mediaDevices.getUserMedia(config)
      .then(stream => {
        this.stream = stream;
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log(err);
        alert('Permission Denied, ' + err);
      });
  }


  stopCamera() {
    this.hidden = true;
    this.stream.getTracks().forEach(track => track.stop());
  }

  ngOnInit(): void {
    this.videoPreview = document.getElementById('preview_video');

    // TODO testing only, to remove
    this.startCamera();
  }


}

