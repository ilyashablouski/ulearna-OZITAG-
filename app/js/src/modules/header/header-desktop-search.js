class HeaderDesktopSearch extends Widget {
  constructor(node) {
    super(node, '.js-header-search', 'desktop');

    this.$input = this.$node.querySelector('input');

    this.init();
  }

  build() {
    this.$input.addEventListener('input', () => {
      if (this.$input.value.trim().length > 0) {
        this.$node.classList.add('active');
      } else {
        this.$node.classList.remove('active');
      }
    });
  }

  destroy() {

  }

  static init(el) {
    el && new HeaderDesktopSearch(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-header-desktop-search').forEach(item => HeaderDesktopSearch.init(item));
});
