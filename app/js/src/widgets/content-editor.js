class ContentEditor extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-content-editor');

    this.init();
  }

  build() {
    document.addEventListener('click', e => {
      const clickedElement = e.target;
      const editableElement = clickedElement.previousElementSibling;
      const notEditElement = !clickedElement.classList.contains('js-content-edit-btn') && !clickedElement.hasAttribute('contenteditable');
      if (clickedElement.classList.contains('js-content-edit-btn')) {
        this.onToggleElement(editableElement);
      } else if (notEditElement) {
        this.onAnchorElements();
      }
    });
  }

  onToggleElement(editableElement) {
    editableElement.getAttribute('contenteditable') ? this.onAnchorElement(editableElement) : this.onEditElement(editableElement);
  }

  onEditElement(element) {
    element.setAttribute('contenteditable', true);
    this.setCustomRangeColor(element);
    this.setCaret(element);
  }

  onAnchorElement(element) {
    element.removeAttribute('contenteditable');
  }

  onAnchorElements() {
    const editableElements = this.$node.querySelectorAll('span');
    const editableElementsArray = Object.values(editableElements);

    const filteredElements = editableElementsArray.filter(element => {
      return element.hasAttribute('contenteditable');
    });

    for (const filteredElement of filteredElements) {
      filteredElement.removeAttribute('contenteditable');
      this.removeCustomRangeColor(filteredElement);
    }
  }

  setCaret(editableElement) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(editableElement);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
  }

  setCustomRangeColor(rangeElement) {
    rangeElement.classList.add('selection');
  }

  removeCustomRangeColor(rangeElement) {
    rangeElement.classList.remove('selection');
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
