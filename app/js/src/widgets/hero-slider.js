class HeroSlider extends Widget {
  constructor(node) {
    super(node, '.js-hero-slider');

    this.$wrapper = this.$node.firstElementChild;
    this.$slides = this.$wrapper.children;

    this.$navPrev = null;
    this.$navNext = null;
    this.$pagination = null;
    this.initialized = false;

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
    this.$slides.forEach($slide => {
      if (!$slide.dataset.video) {
        return;
      }

      const $buttons = document.createElement('div');
      $buttons.classList.add('hero-slider__buttons');

      const $toggleButton = document.createElement('button');
      $toggleButton.classList.add('hero-slider__button');
      $toggleButton.classList.add('hero-slider__button--toggle');
      $toggleButton.classList.add('js-hero-slider__slide-toggle');
      $buttons.appendChild($toggleButton);

      const $soundButton = document.createElement('button');
      $soundButton.innerText = 'Sound On';
      $soundButton.classList.add('hero-slider__button');
      $soundButton.classList.add('hero-slider__button--sound');
      $soundButton.classList.add('js-hero-slider__slide-sound');
      $buttons.appendChild($soundButton);

      $slide.appendChild($buttons);
    });
  }

  initializeSlide($slide) {

  }


  build() {
    if (this.initialized) return;
    if (this.$slides.length > 1) {
      this.createVideoElements();
      this.createSliderElements();
      this.initSwiper();
    }

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
