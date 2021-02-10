class DiscussionSearch extends Widget {
  constructor(node) {
    super(node, '.js-discussion-search');

    this.$input = this.queryElement('input');
    this.$resetButton = this.queryElement('.reset');
    this.$toggleButton = this.queryElement('.toggle');

    this.onResetClick = this.onResetClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);

    this.init();
  }

  build() {
    this.$resetButton.addEventListener('click', this.onResetClick);

    this.$input.addEventListener('input', this.onInputChange);
    this.$input.addEventListener('change', this.onInputChange);
    this.$toggleButton.addEventListener('click', this.onToggleClick);

    this.onInputChange();
  }

  onToggleClick(e) {
    e.preventDefault();
    this.$node.classList.toggle('_opened');
    if (this.$node.classList.contains('_opened')) {
      this.$input.focus();
    }
  }

  onInputChange() {
    this.$node.classList.toggle('_with-value', this.$input.value.trim().length > 0);
  }

  onResetClick(e) {
    e.preventDefault();
    this.$input.value = '';
    triggerInputChange(this.$input);

    this.$node.classList.remove('_opened');
  }

  static init(element) {
    new DiscussionSearch(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-discussion-search').forEach(item => DiscussionSearch.init(item));
});
