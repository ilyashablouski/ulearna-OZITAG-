class SearchInput extends Widget {
  constructor(node) {
    super(node, '.js-search-input');

    this.$input = this.queryElement('input');

    this.onResetClick = this.onResetClick.bind(this);

    this.init();
  }

  build() {
    this.$resetButton = document.createElement('button');
    this.$resetButton.classList.add('search-input__reset');

    this.$node.appendChild(this.$resetButton);

    this.$resetButton.addEventListener('click', this.onResetClick);
  }

  onResetClick(e) {
    e.preventDefault();

    this.$input.value = '';
    triggerInputChange(this.$input);
  }

  static init(el) {
    new SearchInput(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-search-input').forEach(item => SearchInput.init(item));
});
