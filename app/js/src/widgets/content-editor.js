class ContentEditor extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-content-editor');
    this.editButtons = this.queryElements('.js-content-edit-btn');
    console.log(this.editButtons);
  }

  static init(element) {
    new ContentEditor(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-content-editor').forEach(element => {
    ContentEditor.init(element);
  });
});
