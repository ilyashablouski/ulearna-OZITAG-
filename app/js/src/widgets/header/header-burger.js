class HeaderBurger extends Widget {
  constructor(node) {
    super(node, 'js-header', 'tablet-mobile');

    this.$burger = this.queryElement('.burger');

    this.onBurgerClick = this.onBurgerClick.bind(this);

    this.opened = false;

    this.init();
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
  }

  close() {
    this.opened = false;
    this.$node.classList.remove('opened');
  }

  onBurgerClick(e) {
    e.preventDefault();

    this.opened ? this.close() : this.open();
  }

  static init(el) {
    new HeaderBurger(el);
  }
}

window.HeaderBurger = HeaderBurger;
