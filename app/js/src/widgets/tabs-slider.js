class TabsSlider extends Widget {
  constructor(node) {
    super(node, '.js-tabs-slider');

    this.swiper = null;
    this.activeFilter = null;

    this.$slider = this.queryElement('.slider');
    this.$slides = this.queryElements('.item');
    this.$navPrev = this.queryElement('.prev');
    this.$navNext = this.queryElement('.next');
    this.$tabs = this.queryElements('.tab');

    this.init();
  }

  initSwiper() {
    this.swiper = new Swiper(this.$slider, {
      slidesPerView: 4,
      spaceBetween: 0,
      1440: {
        spaceBetween: 15
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        prevEl: this.$navPrev,
        nextEl: this.$navNext,
      },
      on: {
        slideChangeTransitionStart: () => this.$slider.classList.add('transition'),
        slideChangeTransitionEnd: () => this.$slider.classList.remove('transition'),
      },
    });
  }

  events() {
    this.$tabs.forEach($tab => $tab.addEventListener('click', e => {
      e.preventDefault();
      this.setActiveFilter($tab.dataset.filter);
    }));
  }

  setActiveFilter(filter) {
    this.activeFilter = filter;
    this.$tabs.forEach($tab => $tab.classList.toggle('active', $tab.dataset.filter === filter));

    this.processFilter();
  }


  showNode(node) {
    node.classList.add('swiper-slide');
    node.classList.remove('non-swiper-slide');
  }

  hideNode(node) {
    node.classList.remove('swiper-slide');
    node.classList.add('non-swiper-slide');
  }

  checkFilter(filter, $node) {
    if (filter === '*') {
      return true;
    }

    const filters = $node.dataset.filters ? $node.dataset.filters.split(',') : [];

    return filters.indexOf(filter) !== -1;
  }

  processFilter() {
    let visibleCount = 0;

    this.$slides.forEach(node => {
      if (this.checkFilter(this.activeFilter, node)) {
        this.showNode(node);
        visibleCount = visibleCount + 1;
      } else {
        this.hideNode(node);
      }
    });

    this.$node.classList.toggle('no-navigation', visibleCount <= 4);

    this.swiper.destroy(true, true);

    this.initSwiper();
  }

  default() {
    let found = false;

    this.$tabs.forEach($tab => {
      if ($tab.classList.contains('active')) {
        this.setActiveFilter($tab.dataset.filter);
        found = true;
      }
    });

    if (!found) {
      this.setActiveFilter('*');
    }
  }

  build() {
    this.initSwiper();

    this.events();

    this.default();
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
