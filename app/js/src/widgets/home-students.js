class HomeStudents extends Widget {
  constructor(node) {
    super(node, '.js-home-students');

    this.swiper = null;
    this.$slider = this.queryElement('.slider');

    this.$navPrev = this.queryElement('.prev');
    this.$navNext = this.queryElement('.next');

    this.init();
  }

  build() {
    this.swiper = new Swiper(this.$slider, {
      slidesPerView: 3,
      spaceBetween: 50,
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
    el && new HomeStudents(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-home-students').forEach(item => HomeStudents.init(item));
});
