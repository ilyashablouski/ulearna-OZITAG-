class RoundBar extends Widget {
  constructor(node) {
    super(node, 'js-round-bar');

    this.progressLineElement = this.$node.querySelector('.js-round-bar__line');
    this.textElement = this.$node.querySelector('.js-round-bar__text');

    this.init();
  }

  build() {
    const progressLineValue = this.getProgressValue();
    this.setProgressValue(progressLineValue);
  }

  getProgressValue() {
    return this.$node.dataset.value;
  }

  setProgressValue(value) {
    const fullProgressValue = 100;
    this.progressLineElement.setAttribute('stroke-dasharray', `${(value)} ${(fullProgressValue - value)}`);
    this.textElement.innerHTML = value + '%';
  }

  static init(el) {
    el && new RoundBar(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-round-bar').forEach(item => RoundBar.init(item));
});
