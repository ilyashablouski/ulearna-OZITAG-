class TabsSlider extends Widget {
  constructor(node) {
    super(node, '.js-tabs-slider');

    this.swiper = null;
    this.$slider = this.queryElement('.slider');

    this.$navPrev = this.queryElement('.prev');
    this.$navNext = this.queryElement('.next');

    this.init();
  }

  build() {
    this.swiper = new Swiper(this.$slider, {
      slidesPerView: 4,
      spaceBetween: 35,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        prevEl: this.$navPrev,
        nextEl: this.$navNext,
      },
    });
  }

  destroy() {
    this.swiper.destroy(true, true);
  }

  static init(el) {
    el && new TabsSlider(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-tabs-slider').forEach(item => TabsSlider.init(item));
});
