class RatingSelect extends Widget {
  constructor(node) {
    super(node, '.js-rating-select');

    this.mode = node.dataset.mode;
    this.labels = node.dataset.mode === 'level' ? node.dataset.labels.split(',') : [];

    this.$input = this.queryElement('input[type=hidden]');
    this.$label = this.queryElement('.label');
    this.$icons = this.$node.querySelectorAll('.rating-select__icon');

    this.value = 0;

    this.init();
  }

  build() {
    this.$icons.forEach(($icon, ind) => {
      $icon.addEventListener('click', e => {
        e.preventDefault();
        this.onIconClick(ind);
      });
    });

    this.setValue(this.$input.value || 0);
  }

  onIconClick(ind) {
    if ((ind + 1) === this.value) {
      return;
    }

    this.setValue(ind + 1);
  }

  setValue(value) {
    this.value = +value;

    this.$input.value = this.value;
    triggerInputChange(this.$input);

    this.$icons.forEach(($icon, ind) => {
      if (ind < this.value) {
        $icon.classList.add('fill');
      } else {
        $icon.classList.remove('fill');
      }
    });

    this.updateLabel();
  }

  updateLabel() {
    let label = '?';

    if (this.mode === 'level') {
      label = this.labels[this.value - 1];
    } else {
      label = this.value;
    }

    this.$label.innerText = label;
  }

  static init(element) {
    new RatingSelect(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-rating-select').forEach(item => RatingSelect.init(item));
});
