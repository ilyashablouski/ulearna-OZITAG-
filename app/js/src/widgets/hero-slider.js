class HeroSlider extends Widget {
  constructor(node) {
    super(node, '.js-hero-slider');

    this.$wrapper = this.$node.firstElementChild;
    this.$slides = this.$wrapper.children;

    this.$navPrev = null;
    this.$navNext = null;
    this.$pagination = null;
    this.initialized = false;

    this.$soundButton = null;
    this.$playButton = null;

    this.soundEnabled = false;
    this.playEnabled = false;

    this.onSoundClick = this.onSoundClick.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);

    if (this.$slides.length) {
      this.init();
    }
  }

  initSwiper() {
    this.$node.classList.add('swiper-container');
    this.$wrapper.classList.add('swiper-wrapper');
    this.$slides.forEach($slide => $slide.classList.add('swiper-slide'));

    this.swiper = new Swiper(this.$node, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      navigation: {
        prevEl: this.$navPrev,
        nextEl: this.$navNext,
      },
      pagination: {
        el: this.$pagination,
        clickable: true,
      },
    });
  }

  createSliderElements() {
    this.$navPrev = document.createElement('button');
    this.$navPrev.classList.add('hero-slider__nav');
    this.$navPrev.classList.add('hero-slider__nav--prev');
    this.$node.appendChild(this.$navPrev);

    this.$navNext = document.createElement('button');
    this.$navNext.classList.add('hero-slider__nav');
    this.$navNext.classList.add('hero-slider__nav--next');
    this.$node.appendChild(this.$navNext);

    this.$pagination = document.createElement('div');
    this.$pagination.classList.add('swiper-pagination');
    this.$node.appendChild(this.$pagination);
  }

  createVideoElements() {
    const $buttons = document.createElement('div');
    $buttons.classList.add('hero-slider__buttons');

    this.$playButton = document.createElement('button');
    this.$playButton.classList.add('hero-slider__button');
    this.$playButton.classList.add('hero-slider__button--toggle');
    this.$playButton.classList.add('js-hero-slider__slide-toggle');
    $buttons.appendChild(this.$playButton);

    this.$soundButton = document.createElement('button');
    this.$soundButton.innerText = 'Sound On';
    this.$soundButton.classList.add('hero-slider__button');
    this.$soundButton.classList.add('hero-slider__button--sound');
    this.$soundButton.classList.add('js-hero-slider__slide-sound');
    $buttons.appendChild(this.$soundButton);

    this.$soundButton.addEventListener('click', e => {
      e.preventDefault();
      this.onSoundClick();
    });

    this.$playButton.addEventListener('click', e => {
      e.preventDefault();
      this.onPlayClick();
    });

    this.$node.appendChild($buttons);
  }

  onSoundClick() {
    this.soundEnabled = !this.soundEnabled;

    this.drawSoundButton();
  }

  onPlayClick() {
    this.playEnabled = !this.playEnabled;

    this.drawPlayButton();
  }

  drawPlayButton() {
    if (this.playEnabled) {
      this.$playButton.classList.remove('_paused');
    } else {
      this.$playButton.classList.add('_paused');
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

  initializeSlide($slide) {
    if (!$slide.dataset.video) {
      return;
    }
  }

  resetSlide($slide) {
    if (!$slide.dataset.video) {
      return;
    }
  }


  build() {
    if (this.initialized) return;

    if (this.$slides.length > 1) {
      this.createSliderElements();
      this.initSwiper();
    }

    this.createVideoElements();
    this.drawPlayButton();
    this.drawSoundButton();

    this.initializeSlide(this.$slides[0]);

    this.initialized = true;
  }

  static init(el) {
    el && new HeroSlider(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-hero-slider').forEach(item => HeroSlider.init(item));
});
