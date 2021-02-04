class HeaderSearch extends Widget {
  constructor(node) {
    super(node, '.js-header-search', 'desktop');

    this.$input = this.$node.querySelector('input');
    this.$scrollElement = this.$node.querySelector('.js-custom-scroll-header');
    this.init();
  }

  build() {
    this.$input.addEventListener('input', () => {
      if (this.$input.value.trim().length > 0) {
        this.$node.classList.add('active');
        this.addCustomScroll(this.$scrollElement);
      } else {
        this.$node.classList.remove('active');
      }
    });
  }

  addCustomScroll(scrollElement) {
    CustomScroll.init(scrollElement);
  }

  static init(el) {
    el && new HeaderSearch(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-header-search').forEach(item => HeaderSearch.init(item));
});
