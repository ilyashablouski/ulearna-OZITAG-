class PlanSelect extends Widget {
  constructor(node) {
    super(node, '.js-plan-select');

    this.$value = this.queryElement('.value');
    this.$items = this.queryElements('.item');

    this.init();
  }

  build() {
    if (this.$items.length === 0) {
      return;
    }

    this.$items.forEach($node => {
      $node.addEventListener('click', e => {
        e.preventDefault();
        this.setValue($node.dataset.value);
      });
    });

    if (!this.$value.value) {
      this.setValue(this.$items[0].dataset.value);
    } else {
      this.setValue(this.$value.value);
    }
  }

  setValue(value) {
    this.$items.forEach($node => {
      $node.classList.toggle('selected', $node.dataset.value === value);
    });

    this.$value.value = value;
    triggerInputChange(this.$value);
  }

  static init(el) {
    el && new PlanSelect(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-plan-select').forEach(item => PlanSelect.init(item));
});
