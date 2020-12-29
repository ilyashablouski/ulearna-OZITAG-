class PlayList extends Widget {
  constructor(node) {
    super(node, '.js-playlist');

    this.$toggle = this.queryElement('.toggle');
    this.$body = this.queryElement('.body');

    this.init();
  }

  build() {
    Accord.init(this.$node, {
      toggleElement: this.$toggle,
      bodyElement: this.$body,
    });
  }

  static init(el) {
    el && new PlayList(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-playlist').forEach(item => PlayList.init(item));
});
