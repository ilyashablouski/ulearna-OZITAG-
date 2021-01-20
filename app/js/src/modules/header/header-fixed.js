class HeaderFixed extends Widget {
  constructor(node) {
    super(node);

    this.isFixed = false;

    this.events();

    this.update();
    this.updateHeight();
  }

  events() {
    onScroll(this.onScroll.bind(this));
  }

  destroy() {
    this.setHeaderAsNotFixed();
  }

  setHeaderAsFixed() {
    if (this.isFixed) return;
    this.isFixed = true;

    this.$node.classList.add('fixed-prepare');
    this.$node.classList.add('fixed');
  }

  setHeaderAsNotFixed() {
    if (!this.isFixed) return;
    this.isFixed = false;

    document.body.classList.remove('header-fixed');
    this.$node.classList.remove('fixed-prepare');
    this.$node.classList.remove('fixed');
  }

  update() {
    const scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

    if (scrollTop > 300) {
      this.setHeaderAsFixed();
    } else {
      this.setHeaderAsNotFixed();
    }

    if (this.isFixed === false && scrollTop > this.baseBeight && document.body.classList.contains('header-fixed') === false) {
      this.$node.classList.add('fixed-prepare');
      document.body.classList.add('header-fixed');
    }

    if (scrollTop <= this.baseBeight) {
      this.$node.classList.remove('fixed-prepare');
      document.body.classList.remove('header-fixed');
    }
  }

  updateHeight() {
    this.baseBeight = this.$node.offsetHeight;
  }

  onScroll() {
    this.update();
  }

  static init(el) {
    new HeaderFixed(el);
  }
}

window.HeaderFixed = HeaderFixed;
