class DiscussionSearch extends Widget {
  constructor(node) {
    super(node, '.js-discussion-search');

    this.$input = this.queryElement('input');
    this.$resetButton = this.queryElement('.reset');

    this.onResetClick = this.onResetClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.init();
  }

  build() {
    this.$resetButton.addEventListener('click', this.onResetClick);

    this.$input.addEventListener('input', this.onInputChange);
    this.$input.addEventListener('change', this.onInputChange);

    this.onInputChange();
  }

  onInputChange() {
    this.$node.classList.toggle('_with-value', this.$input.value.trim().length > 0);
  }

  onResetClick(e) {
    e.preventDefault();
    this.$input.value = '';
    triggerInputChange(this.$input);
  }

  static init(element) {
    new DiscussionSearch(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-discussion-search').forEach(item => DiscussionSearch.init(item));
});
