class HeaderMobile extends Widget {
  constructor(node) {
    super(node, 'js-header', 'tablet-mobile');

    this.$container = this.queryElement('.search');
    this.$toggleButtons = this.queryElements('.search-toggle');

    this.onToggleClick = this.onToggleClick.bind(this);
    this.opened = false;

    this.init();
  }

  build() {
    this.$toggleButtons.forEach($button => {
      $button.addEventListener('click', this.onToggleClick);
    });
  }

  destroy() {
    this.$toggleButtons.forEach($button => {
      $button.removeEventListener('click', this.onToggleClick);
    });
  }

  onToggleClick(e) {
    e.preventDefault();

    this.toggle();
  }

  toggle() {
    this.opened ? this.close() : this.open();
  }

  open() {
    this.opened = true;
    this.$container.classList.add('visible');
    this.$container.querySelector('input').focus();
  }

  close() {
    this.opened = false;
    this.$container.classList.remove('visible');
  }

  static init(el) {
    self.el = new HeaderMobile(el);
  }

  static openSearch() {
    if (self.el) {
      self.el.open();
    }
  }
}

window.HeaderMobile = HeaderMobile;
