class MobileSlider extends Widget {
  constructor(node) {
    super(node, '.js-mobile-slider', 'mobile');

    this.swiper = null;

    this.$wrapper = this.queryElement('.row');
    this.$slides = this.$wrapper.children;
    this.$pagination = null;

    this.init();
  }

  build() {
    this.$node.classList.add('swiper-container');
    this.$wrapper.classList.add('swiper-wrapper');
    this.$slides.forEach($slide => $slide.classList.add('swiper-slide'));

    this.$pagination = document.createElement('div');
    this.$pagination.classList.add('swiper-pagination');
    this.$node.append(this.$pagination);

    this.swiper = new Swiper(this.$node, {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  destroy() {
    this.$node.classList.remove('swiper-container');
    this.$wrapper.classList.remove('swiper-wrapper');
    this.$slides.forEach($slide => $slide.classList.remove('swiper-slide'));
    this.$pagination.remove();

    if (this.swiper) {
      this.swiper.destroy();
    }
  }

  static init(el) {
    el && new MobileSlider(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-mobile-slider').forEach(item => MobileSlider.init(item));
});
