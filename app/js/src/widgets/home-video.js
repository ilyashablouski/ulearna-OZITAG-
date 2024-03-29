class HomeVideo extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-home-video');

    this.$playButton = this.queryElement('.toggle', true);
    this.$soundButton = this.queryElement('.sound');
    this.$fullScreenButton = this.queryElement('.full', true);

    this.video = nodeElement.querySelector('video');

    this.playEnabled = true;
    this.soundEnabled = true;

    this.init();
  }


  build() {
    if (this.$playButton) {
      this.$playButton.addEventListener('click', e => {
        e.preventDefault();
        this.toggle();
      });
    }

    if (this.$fullScreenButton) {
      this.$fullScreenButton.addEventListener('click', e => {
        e.preventDefault();
        this.fullScreen();
      });
    }

    this.$soundButton.addEventListener('click', e => {
      e.preventDefault();
      this.sound();
    });
  }

  fullScreen() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    } else if (this.video.msRequestFullscreen) {
      this.video.msRequestFullscreen();
    }
  }

  toggle() {
    this.playEnabled = !this.playEnabled;

    if (this.playEnabled) {
      this.video.play();
    } else {
      this.video.pause();
    }

    this.drawPlayButton();
  }

  sound() {
    this.soundEnabled = !this.soundEnabled;

    this.drawSoundButton();
  }

  drawPlayButton() {
    if (this.$playButton) {
      if (this.playEnabled) {
        this.$playButton.classList.remove('_paused');
      } else {
        this.$playButton.classList.add('_paused');
      }
    }
  }

  drawSoundButton() {
    if (this.soundEnabled) {
      this.$soundButton.classList.remove('_off');
      this.$soundButton.innerText = 'Sound On';
    } else {
      this.$soundButton.classList.add('_off');
      this.$soundButton.innerText = 'Sound Off';
    }
  }


  static init(element) {
    new HomeVideo(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-home-video').forEach((element) => {
    HomeVideo.init(element);
  });
});

window.CustomScroll = HomeVideo;
