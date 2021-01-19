class Editor extends Widget {
  constructor(element) {
    super(element, '.editor');
  }

  static init() {
    ClassicEditor.create(document.querySelector('.editor'), {
      toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', '|', 'heading'],
      heading: {
        options: [
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'editor__heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'editor__heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'editor__heading4' },
        ],
      },
    })
      .then(editor => {
        console.log(editor);
        const $editorScrollElement = editor.sourceElement.nextElementSibling.querySelector('.ck-editor__editable');
        new PerfectScrollbar($editorScrollElement, {
          minScrollbarLength: 20,
        });
      })
      .catch(error => {
        console.error(error);
      });

  }

}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.editor').forEach(element => {
    Editor.init(element);
  });
});

