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
        this.onEditElement(editableElement);
      } else if (notEditElement) {
        this.onAnchorElements();
      }
    });
  }

  onEditElement(element) {
    element.setAttribute('contenteditable', true);
    this.setCustomRangeColor(element);
    this.setCaret(element);
  }

  onAnchorElements() {
    const editableElements = this.$node.querySelectorAll('span');
    const editableElementsArray = Object.values(editableElements);

    const filteredElements = editableElementsArray.filter(element => {
      return element.hasAttribute('contenteditable');
    });

    for (const filteredElement of filteredElements) {
      filteredElement.setAttribute('contenteditable', false);
      this.removeCustomRangeColor(filteredElement);
    }
  }

  setCaret(element) {
    const childNode = element.firstChild;
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(childNode);
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
