class HeaderSearchDesktop extends Widget {
  constructor(node) {
    super(node, '.js-header-search', 'desktop');

    this.$input = this.$node.querySelector('input');

    this.onInputChange = this.onInputChange.bind(this);

    this.init();
  }

  build() {
    this.$input.addEventListener('input', this.onInputChange);
    this.$input.addEventListener('change', this.onInputChange);
  }

  onInputChange(e) {
    if (e.target.value.trim().length > 0) {
      this.$node.classList.add('active');
    } else {
      this.$node.classList.remove('active');
    }
  }

  static init(el) {
    el && new HeaderSearchDesktop(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-header-search').forEach(item => HeaderSearchDesktop.init(item));
});
