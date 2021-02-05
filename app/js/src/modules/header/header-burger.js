class HeaderBurger extends Widget {
  constructor(node) {
    super(node, 'js-header', 'tablet-mobile');

    this.$burger = this.queryElement('.burger');

    this.onBurgerClick = this.onBurgerClick.bind(this);

    this.opened = false;

    this.init();

    return this;
  }

  build() {
    this.$burger.addEventListener('click', this.onBurgerClick);
  }

  destroy() {
    this.$burger.removeEventListener('click', this.onBurgerClick);
    this.close();
  }

  open() {
    this.opened = true;
    this.$node.classList.add('opened');
    hideScrollbar();
  }

  close() {
    this.opened = false;
    this.$node.classList.remove('opened');
    showScrollbar();
  }

  onBurgerClick(e) {
    e.preventDefault();

    this.opened ? this.close() : this.open();
  }

  static init(el) {
    HeaderBurger.el = new HeaderBurger(el);
  }

  static open() {
    if (HeaderBurger.el) {
      HeaderBurger.el.open();
    }
  }
}

window.HeaderBurger = HeaderBurger;
