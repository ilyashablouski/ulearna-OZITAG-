class Editor extends Widget {
  constructor(element) {
    super(element, '.editor');
  }

  static init() {
    ClassicEditor.create(document.querySelector('.editor'), {
      toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', '|', 'heading'],
      heading: {
        options: [
          {
            model: 'heading2',
            view: 'h2',
            title: '<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '<path d="M7.56363 0.601318C7.72236 0.236184 8.08257 0 8.48072 0H10.4698C10.8671 0 11.2267 0.235171 11.386 0.599131L18.387 16.5991C18.6761 17.2598 18.1921 18 17.4709 18H15.1707C14.7646 18 14.3989 17.7544 14.2451 17.3786L12.9394 14.1864H5.90713L4.64847 17.3679C4.49753 17.7494 4.12888 18 3.7186 18H1.52513C0.804983 18 0.320931 17.2618 0.60804 16.6013L7.56363 0.601318ZM9.35935 5.23729L7.16016 10.8305H11.5841L9.35935 5.23729Z" fill="#20B7F7"/>\n' +
              '</svg>\n',
            class: 'editor__heading editor__heading--2',
          },
          { model: 'heading3', view: 'h3', title: '', class: 'editor__heading editor__heading--3' },
          { model: 'heading4', view: 'h4', title: '', class: 'editor__heading editor__heading--4' },
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

