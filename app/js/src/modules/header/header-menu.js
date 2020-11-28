class HeaderMenu extends Widget {
  constructor(node) {
    super(node, 'js-header', 'tablet-mobile');

    this.$dropdowns = this.queryElements('.dropdown');

    this.init();
  }

  build() {
    this.$dropdowns.forEach($dropdown => {
      Accord.init($dropdown, {
        toggleElement: $dropdown.querySelector('.header-menu__item-link'),
        bodyElement: $dropdown.querySelector('.header-menu__dropdown'),
      });
    });
  }

  destroy() {
    this.$dropdowns.forEach($dropdown => {
      Accord.destroy($dropdown);
    });
  }

  static init(el) {
    new HeaderMenu(el);
  }
}

window.HeaderMenu = HeaderMenu;
