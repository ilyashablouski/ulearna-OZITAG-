class CatalogFilter extends Widget {
  constructor(node) {
    super(node, '.js-catalog-filter');

    this.$searchToggleButtons = this.queryElements('.search-toggle');
    this.mobileOpened = false;

    this.init();
  }

  build() {
    this.$searchToggleButtons.forEach($button => {
      $button.addEventListener('click', e => {
        e.preventDefault();
        this.toggleMobileFilters();
      });
    });
  }

  toggleMobileFilters() {
    if (!this.mobileOpened) {
      this.mobileOpened = true;
      hideScrollbar();
      this.$node.classList.add('mobile-opened');
    } else {
      this.mobileOpened = false;
      showScrollbar();
      this.$node.classList.remove('mobile-opened');
    }
  }

  static init(el) {
    el && new CatalogFilter(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-catalog-filter').forEach(item => CatalogFilter.init(item));
});
