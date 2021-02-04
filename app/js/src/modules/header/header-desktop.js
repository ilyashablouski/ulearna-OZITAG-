class HeaderDesktop extends Widget {
  constructor(node) {
    super(node, 'js-header', 'desktop');

    this.$openButton = this.queryElement('.open-search', true);
    if (!this.$openButton) {
      return;
    }

    this.$closeButton = this.queryElement('.close-search');
    this.$searchBlock = this.queryElement('.header-search');


    this.onOpenClick = this.onOpenClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);

    this.opened = false;

    this.init();
  }

  build() {
    if (this.$openButton) {
      this.$openButton.addEventListener('click', this.onOpenClick);
    }
    if (this.$closeButton) {
      this.$closeButton.addEventListener('click', this.onCloseClick);
    }
  }

  destroy() {
    if (this.$openButton) {
      this.$openButton.removeEventListener('click', this.onOpenClick);
    }

    if (this.$closeButton) {
      this.$closeButton.removeEventListener('click', this.onCloseClick);
    }

    this.close();
  }

  onOpenClick(e) {
    e.preventDefault();
    this.open();
  }

  onCloseClick(e) {
    e.preventDefault();
    this.close();
  }

  open() {
    this.opened = true;
    this.$searchBlock.classList.add('visible');
    this.$openButton.classList.add('hidden');
    this.$searchBlock.querySelector('input').focus();
  }

  close() {
    this.opened = false;
    this.$searchBlock.classList.remove('visible');
    this.$openButton.classList.remove('hidden');
  }

  static init(el) {
    new HeaderDesktop(el);
  }
}

window.HeaderDesktop = HeaderDesktop;
