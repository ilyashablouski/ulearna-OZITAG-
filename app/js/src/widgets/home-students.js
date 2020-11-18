class HomeStudents extends Widget {
  constructor(node) {
    super(node, '.js-home-students');

    this.$slider = this.queryElement('.slider');

    this.init();
  }

  build() {
    this.swiper = new Swiper(this.$slider, {
      slidesPerView: 3,
      spaceBetween: 50,
    });
  }

  static init(el) {
    el && new HomeStudents(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-home-students').forEach(item => HomeStudents.init(item));
});
