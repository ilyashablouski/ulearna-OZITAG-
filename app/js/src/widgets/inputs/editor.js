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
          { model: 'heading4', view: 'h4', title: 'A', class: 'editor__heading editor__heading--4' },
          { model: 'heading3', view: 'h3', title: 'A', class: 'editor__heading editor__heading--3' },
          { model: 'heading2', view: 'h2', title: 'A', class: 'editor__heading editor__heading--2' },
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
        this.changeButtons();
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
  };

  changeButtons() {
    const panelElement = document.querySelector('.ck-toolbar__items');
    const childrenElements = panelElement.children;
    const boldBtnElement = childrenElements[0];
    const italicBtnElement = childrenElements[1];
    const unorderListElement = childrenElements[2];
    const orderListElement = childrenElements[3];


    boldBtnElement.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7923 18.4343L18.7934 18.4323C19.2028 17.7331 19.4014 16.8739 19.4014 15.8652C19.4014 15.2665 19.2966 14.7078 19.085 14.1913C18.8922 13.6628 18.6195 13.2012 18.266 12.8091C17.9119 12.3994 17.4793 12.0707 16.9705 11.8228C16.6612 11.6562 16.3349 11.5282 15.992 11.4385C16.6839 11.1384 17.2669 10.7174 17.7372 10.174C18.3458 9.47085 18.6442 8.58292 18.6442 7.5262C18.6442 6.68657 18.4791 5.95659 18.1395 5.34443C17.806 4.74326 17.3655 4.25407 16.8184 3.88006C16.2914 3.49144 15.6873 3.21881 15.0087 3.06076C14.337 2.88749 13.6563 2.80078 12.9671 2.80078H7.00078C6.33804 2.80078 5.80078 3.33804 5.80078 4.00078V20.0008C5.80078 20.6635 6.33804 21.2008 7.00078 21.2008H12.437C13.2917 21.2008 14.1299 21.1147 14.9512 20.9424C15.7956 20.7688 16.5419 20.4812 17.1873 20.0771L17.1885 20.0763C17.8539 19.653 18.3891 19.1052 18.7923 18.4343ZM11.806 5.94654C13.0056 5.94654 13.8276 6.14137 14.3137 6.49329L14.3195 6.49733C14.8096 6.82646 15.0639 7.33429 15.0639 8.0601C15.0639 8.67584 14.8235 9.16896 14.3329 9.5552C13.862 9.92224 13.1239 10.1228 12.0836 10.1228H9.38104V5.94654H11.806ZM14.5966 17.6426C14.2321 17.8182 13.8255 17.9313 13.3747 17.9799C12.9268 18.03 12.5044 18.055 12.1089 18.055H9.38104V13.2686H12.2351C13.5198 13.2686 14.4247 13.4549 14.9824 13.7982L14.9845 13.7995C15.5282 14.1252 15.8211 14.7075 15.8211 15.611C15.8211 16.1762 15.701 16.6054 15.4807 16.9171C15.2481 17.2289 14.9543 17.4703 14.5966 17.6426Z" fill="currentColor"/>
</svg>
`;

    italicBtnElement.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 6.375C19.3023 6.375 19.75 5.92728 19.75 5.375V4C19.75 3.44772 19.3023 3 18.75 3H9.5C8.94772 3 8.5 3.44772 8.5 4V5.375C8.5 5.92728 8.94772 6.375 9.5 6.375H11.7265L8.5135 17.625H5C4.44771 17.625 4 18.0727 4 18.625V20C4 20.5523 4.44772 21 5 21H14.25C14.8023 21 15.25 20.5523 15.25 20V18.625C15.25 18.0727 14.8023 17.625 14.25 17.625H12.0235L15.2365 6.375H18.75Z" fill="currentColor"/>
</svg>
`;

    unorderListElement.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 4C2.89543 4 2 4.89543 2 6C2 7.10457 2.89543 8 4 8C5.10457 8 6 7.10457 6 6C6 4.89543 5.10457 4 4 4ZM9 5C8.44772 5 8 5.44772 8 6C8 6.55228 8.44772 7 9 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H9ZM4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10ZM9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H9ZM2 18C2 16.8954 2.89543 16 4 16C5.10457 16 6 16.8954 6 18C6 19.1046 5.10457 20 4 20C2.89543 20 2 19.1046 2 18ZM8 18C8 17.4477 8.44772 17 9 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H9C8.44772 19 8 18.5523 8 18Z" fill="currentColor"/>
</svg>
`;

    orderListElement.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.45822 5.65537L4.22372 4.94915V8H5V4H4.24528L3 5.10169L3.45822 5.65537ZM9 5C8.44772 5 8 5.44772 8 6C8 6.55228 8.44772 7 9 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H9ZM9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H9ZM8 18C8 17.4477 8.44772 17 9 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H9C8.44772 19 8 18.5523 8 18ZM3 13.1167L4.67004 11.7444C4.75506 11.6741 4.84008 11.5944 4.9251 11.5056C5.01012 11.4167 5.05263 11.313 5.05263 11.1944C5.05263 11.0611 5 10.9574 4.89474 10.8833C4.78947 10.8056 4.66599 10.7667 4.52429 10.7667C4.35425 10.7667 4.22065 10.8148 4.12348 10.9111C4.03036 11.0074 3.97773 11.1259 3.96559 11.2667L3.05466 11.2056C3.0668 11.0019 3.11336 10.8259 3.19433 10.6778C3.2753 10.5259 3.38259 10.4 3.51619 10.3C3.6498 10.2 3.80567 10.1259 3.98381 10.0778C4.16599 10.0259 4.36235 10 4.57287 10C4.76721 10 4.94939 10.0259 5.11943 10.0778C5.28947 10.1259 5.43725 10.2 5.56275 10.3C5.68826 10.3963 5.78543 10.5185 5.85425 10.6667C5.92713 10.8148 5.96356 10.987 5.96356 11.1833C5.96356 11.3093 5.94939 11.4241 5.92105 11.5278C5.89271 11.6278 5.85223 11.7204 5.7996 11.8056C5.75101 11.887 5.69231 11.963 5.62348 12.0333C5.55466 12.1037 5.47976 12.1722 5.39879 12.2389L4.09312 13.2667H6V14H3V13.1167ZM4.37328 17.5902H4.08448V18.3005H4.29077C4.389 18.3005 4.48723 18.3042 4.58546 18.3115C4.68369 18.3151 4.7721 18.3315 4.85069 18.3607C4.92927 18.3898 4.99214 18.4353 5.03929 18.4973C5.09037 18.5556 5.11591 18.6393 5.11591 18.7486C5.11591 18.8944 5.06876 19.0146 4.97446 19.1093C4.88409 19.2004 4.74263 19.2459 4.5501 19.2459C4.36149 19.2459 4.21807 19.2058 4.11984 19.1257C4.02554 19.0455 3.96267 18.9362 3.93124 18.7978L3 19C3.08644 19.3461 3.26326 19.5993 3.53045 19.7596C3.80157 19.9199 4.12377 20 4.49705 20C4.70138 20 4.89391 19.9763 5.07466 19.929C5.25933 19.8816 5.41847 19.8106 5.55206 19.7158C5.68959 19.6175 5.79764 19.4954 5.87623 19.3497C5.95874 19.204 6 19.0346 6 18.8415C6 18.7286 5.98232 18.6211 5.94695 18.5191C5.91159 18.4171 5.86051 18.326 5.79371 18.2459C5.72692 18.1658 5.6444 18.0984 5.54617 18.0437C5.45187 17.9891 5.34185 17.9545 5.21611 17.9399V17.9235C5.44794 17.8798 5.62475 17.7814 5.74656 17.6284C5.86837 17.4754 5.92927 17.2914 5.92927 17.0765C5.92927 16.8907 5.88998 16.7304 5.81139 16.5956C5.73674 16.4608 5.63458 16.3497 5.50491 16.2623C5.37525 16.1712 5.22397 16.1056 5.05108 16.0656C4.88212 16.0219 4.7053 16 4.52063 16C4.34381 16 4.17485 16.0182 4.01375 16.0546C3.85658 16.0874 3.71316 16.1403 3.5835 16.2131C3.45383 16.286 3.34185 16.3825 3.24754 16.5027C3.15324 16.6193 3.08251 16.7614 3.03536 16.929L4.00786 17.1148C4.03536 17.0128 4.0943 16.9271 4.18468 16.8579C4.27505 16.7887 4.389 16.7541 4.52652 16.7541C4.67191 16.7541 4.79371 16.7923 4.89195 16.8689C4.99411 16.9454 5.04519 17.0419 5.04519 17.1585C5.04519 17.2495 5.02554 17.3242 4.98625 17.3825C4.94695 17.4372 4.89391 17.4809 4.82711 17.5137C4.76424 17.5428 4.69352 17.5628 4.61493 17.5738C4.53635 17.5847 4.4558 17.5902 4.37328 17.5902Z" fill="currentColor"/>
</svg>
`;

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

