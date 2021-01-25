class DragSortable extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-drag-sortable');
    this.init();
  }

  build() {
    new Sortable(this.$node, {
      handle: '.js-drag-handle',
      animation: 150,
    });
  }

  static init(element) {
    new DragSortable(element);
  }

}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-drag-sortable').forEach(element => {
    DragSortable.init(element);
  });
});
