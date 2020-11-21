class HomeStudents extends Widget {
  constructor(node) {
    super(node, '.js-home-students');

    this.swiper = null;
    this.sceneSwiper = null;

    this.$scene = this.queryElement('.scene');
    this.$slider = this.queryElement('.slider');

    this.$navPrev = this.queryElement('.prev');
    this.$navNext = this.queryElement('.next');

    this.$cells = this.queryElements('.cell');

    this.switchTimer = null;

    this.onChangeLayout = this.onChangeLayout.bind(this);

    this.init();
  }

  initSwippers() {
    this.swiper = new Swiper(this.$slider, {
      slidesPerView: 3,
      spaceBetween: 0,
      navigation: {
        prevEl: this.$navPrev,
        nextEl: this.$navNext,
      },
    });

    this.sceneSwiper = new Swiper(this.$scene, {
      slidesPerView: 1,
      effect: 'fade',
      simulateTouch: false,
      fadeEffect: {
        crossFade: true,
      },
    });
  }

  build() {
    this.$cells.forEach((node, ind) => {
      node.querySelector('.feature').addEventListener('mouseover', () => {
        if (this.switchTimer) clearTimeout(this.switchTimer);
        this.switchTimer = setTimeout(() => {
          this.sceneSwiper.slideTo(ind);

          this.$cells.forEach($node => $node.classList.remove('hovered'));
          node.classList.add('hovered');
        }, 200);
      });
    });

    Layout.addListener(this.onChangeLayout);
    this.onChangeLayout();
  }

  onChangeLayout() {
    if (Layout.isDesktopLayout()) {
      this.initSwippers();
    } else {
      this.swiper.destroy(true, true);
    }
  }

  static init(el) {
    el && new HomeStudents(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-home-students').forEach(item => HomeStudents.init(item));
});
