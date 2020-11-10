class Header extends Widget {
  constructor(node) {
    super(node, 'js-header');

    HeaderBurger.init(this.$node);
  }

  static init(el) {
    new Header(el);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  Header.init(document.querySelector('.js-header'));
});
