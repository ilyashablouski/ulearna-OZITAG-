class ContentEditor extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-content-editor');
    // this.editButtons = this.queryElements('.js-content-edit-btn');

    this.init();
  }

  build() {
    this.$node.addEventListener('click', e => {
      const target = e.target;
      console.log(target);
      if (target.classList.contains('js-content-edit-btn')) {
        // this.editElement();
        console.log('Деллигированный обработчик сработал');
      }
    });
  }

  // editElement () {
  //
  // }

  static init(element) {
    new ContentEditor(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-content-editor').forEach(element => {
    ContentEditor.init(element);
  });
});
