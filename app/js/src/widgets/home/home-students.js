class HomeStudents extends Widget {
  constructor(node) {
    super(node, '.js-home-students');

    this.swiper = null;
    this.sceneSwiper = null;
    this.mobileSwiper = null;

    this.$pagination = null;

    this.$scene = this.queryElement('.scene');
    this.$slider = this.queryElement('.slider');

    this.$navPrev = this.queryElement('.prev');
    this.$navNext = this.queryElement('.next');

    this.$cells = this.queryElements('.cell');

    this.switchTimer = null;

    this.onChangeLayout = this.onChangeLayout.bind(this);

    this.init();
  }

  initSceneSwiper() {
    this.sceneSwiper = new Swiper(this.$scene, {
      slidesPerView: 1,
      effect: 'fade',
      simulateTouch: false,
      allowTouchMove: false,
      fadeEffect: {
        crossFade: true,
      },
    });
  }

  initNavigationSwiper() {
    this.swiper = new Swiper(this.$slider, {
      slidesPerView: 3,
      spaceBetween: 0,
      navigation: {
        prevEl: this.$navPrev,
        nextEl: this.$navNext,
      },
    });
  }

  setActiveScene(ind) {
    this.sceneSwiper.slideTo(ind);
  }

  build() {
    this.initSceneSwiper();

    this.$cells.forEach((node, ind) => {
      node.querySelector('.feature').addEventListener('mouseover', () => {
        if (this.switchTimer) clearTimeout(this.switchTimer);
        this.switchTimer = setTimeout(() => {
          this.setActiveScene(ind);

          this.$cells.forEach($node => $node.classList.remove('hovered'));
          node.classList.add('hovered');
        }, 200);
      });

      node.addEventListener('click', () => {
        if (isTouchDevice() === false) return;
        this.setActiveScene(ind);

        this.$cells.forEach($node => $node.classList.remove('hovered'));
        node.classList.add('hovered');
      });
    });

    Layout.addListener(this.onChangeLayout);
    this.onChangeLayout();
  }

  destroyMobile() {
    if (this.mobileSwiper) {
      this.$pagination.remove();
      this.mobileSwiper.destroy();
    }
  }

  initMobile() {
    this.$pagination = document.createElement('div');
    this.$pagination.classList.add('swiper-pagination');
    this.$slider.append(this.$pagination);

    this.mobileSwiper = new Swiper(this.$slider, {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: this.$pagination,
        clickable: true,
      },
      on: {
        slideChange: () => {
          this.setActiveScene(this.mobileSwiper.activeIndex);
        },
      },
    });
  }

  onChangeLayout() {
    if (!Layout.isMobileLayout()) {
      this.destroyMobile();
    }

    if (Layout.isDesktopLayout()) {
      this.initNavigationSwiper();
    } else {
      if (this.swiper) {
        this.swiper.destroy(true, true);
      }

      if (Layout.isMobileLayout()) {
        this.initMobile();
      }
    }
  }

  static init(el) {
    el && new HomeStudents(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-home-students').forEach(item => HomeStudents.init(item));
});
