class HeaderSearchMobile extends Widget {
  constructor(node) {
    super(node, '.js-header', 'tablet-mobile');

    this.$button = this.queryElement('.open-search');
    this.$stickyInput = this.queryElement('.header-search__input .search-input__input');

    this.onSearchClick = this.onSearchClick.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);

    this.init();
  }

  build() {
    this.$button.addEventListener('click', this.onSearchClick);
    this.$stickyInput.addEventListener('focus', this.onInputFocus);
  }

  destroy() {
    this.$button.removeEventListener('click', this.onSearchClick);
    this.$stickyInput.removeEventListener('focus', this.onInputFocus);
  }

  onSearchClick(e) {
    e.preventDefault();

    this.open();
  }

  onInputFocus(){
    this.open();
  }

  open() {
    HeaderBurger.open();
    HeaderMobile.openSearch();
  }

  static init(el) {
    el && new HeaderSearchMobile(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-header').forEach(item => HeaderSearchMobile.init(item));
});
