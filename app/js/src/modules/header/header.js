class Header extends Widget {
  constructor(node) {
    super(node, 'js-header');

    HeaderBurger.init(this.$node);
    HeaderMenu.init(this.$node);
    HeaderSearch.init(this.$node);

    if (this.$node.classList.contains('.js-header--fixed')) {
      HeaderFixed.init(this.$node);
    }
  }

  static init(el) {
    new Header(el);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  Header.init(document.querySelector('.js-header'));
});
