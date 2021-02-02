class Editor extends Widget {
  constructor(element) {
    super(element, '.editor');
    this.initEditorPlugin();
  }

  initEditorPlugin() {
    ClassicEditor.create(document.querySelector('.editor'), {
      toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', '|', 'heading'],
      heading: {
        options: [
          { model: 'heading2', view: 'h2', title: 'A', class: 'editor__heading editor__heading--2' },
          { model: 'heading3', view: 'h3', title: 'A', class: 'editor__heading editor__heading--3' },
          { model: 'heading4', view: 'h4', title: 'A', class: 'editor__heading editor__heading--4' },
        ],
      },
    })
      .then(editor => {
        console.log(editor);
        const $editorScrollElement = editor.sourceElement.nextElementSibling.querySelector('.ck-editor__editable');
        new PerfectScrollbar($editorScrollElement, {
          minScrollbarLength: 20,
        });
        // Change default heading
        this.changeHeading();
      })
      .catch(error => {
        console.error(error);
      });
  }

  changeHeading() {
    const headingElements = document.querySelectorAll('.editor__heading');
    const panelElement = document.querySelector('.ck-toolbar__items');
    headingElements.forEach(element => {
      panelElement.appendChild(element);
      element.innerHTML = `<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.75505 0.984125C4.91331 0.617948 5.27407 0.380859 5.67298 0.380859H6.29528C6.69333 0.380859 7.05348 0.616935 7.21227 0.981944L11.2665 10.3014C11.4102 10.6316 11.1681 11.0009 10.808 11.0009H9.26721C9.06381 11.0009 8.88067 10.8776 8.80405 10.6892L8.01578 8.75086H3.89078L3.13046 10.6839C3.05524 10.8751 2.87066 11.0009 2.66516 11.0009H1.18658C0.826967 11.0009 0.584946 10.6326 0.727618 10.3025L4.75505 0.984125ZM5.91578 3.47086L4.62578 6.77086H7.22078L5.91578 3.47086Z" fill="currentColor"/>
      </svg>
      `;

    });
    console.log(headingElements);
  };

  static init(element) {
    new Editor(element);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.editor').forEach(element => {
    Editor.init(element);
  });
});

