class Quiz extends Widget {
  constructor(nodeElement, options = {}) {
    super(nodeElement, 'js-quiz');
    this.$defaultQuizElement = options.defaultQuizElement ? options.defaultQuizElement : this.queryElement('.default');

    this.build();
  }

  build() {
    document.addEventListener('click', e => {
      const clickedElement = e.target;
      const toggleBtn = clickedElement.closest('.js-quiz__toggle');
      const questionBtn = clickedElement.closest('.js-quiz__add-question');
      const responseBtn = clickedElement.closest('.js-quiz__add-response');
      console.log('Toggle btn:' + toggleBtn + '\r\n',
        'Question btn:' + questionBtn + '\r\n',
        'Response btn:' + responseBtn + '\r\n');

      if (toggleBtn) {
        this.onToggleChecked(toggleBtn);
      } else if (questionBtn) {
        this.addQuestion();
      } else if (responseBtn) {
        this.addResponse(responseBtn);
      }
    });
  }

  onToggleChecked(element) {
    element.classList.toggle('checked');
    if (element.classList.contains('checked')) {
      this.setChecked(element);
    } else {
      this.setUnchecked(element);
    }
  }

  setChecked(element) {
    const checkedElement =
      `<label class="exam-list-answer__checkbox-label" for="2">
        <input type="checkbox" checked="" id="1">
          <span class="exam-list-answer__checkbox-inner">
          <svg class="icon icon--check-mark">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../assets/images/spriteInline.svg#check-mark"></use>
          </svg>
            Correct
          </span>
      </label>`;

    element.innerHTML = checkedElement;
  }

  setUnchecked(element) {
    const uncheckedElement =
      `<label class="exam-list-answer__checkbox-label" for="1">
        <input type="checkbox" id="2">
          <span class="exam-list-answer__checkbox-inner">Mark as correct</span>
      </label>`;

    element.innerHTML = uncheckedElement;
  }

  addQuestion() {
    const cloneQuizElement = this.$defaultQuizElement.parentElement.lastElementChild.cloneNode(true);
    this.editQuestionNumber(cloneQuizElement);

    this.$defaultQuizElement.parentElement.append(cloneQuizElement);
  }

  addResponse(buttonElement) {
    const parentResponseElement = buttonElement.previousElementSibling;
    const cloneResponseElement = parentResponseElement.lastElementChild.cloneNode(true);
    this.editResponseLetter(cloneResponseElement);

    parentResponseElement.append(cloneResponseElement);
  }


  editQuestionNumber(element) {
    const elementNumberString = element.querySelector('.exam-list__question-number');
    const string = elementNumberString.textContent;

    let elementNumber = Number(string);
    elementNumber++;
    elementNumberString.textContent = elementNumber + '.';
  }

  editResponseLetter(element) {
    const elementString = element.querySelector('.exam-list-answer__title-label');
    const string = elementString.textContent;
    let letterUtf8Number = string.charCodeAt(0);
    letterUtf8Number++;
    const newString = String.fromCharCode(letterUtf8Number);
    elementString.textContent = newString + '.';
    console.log(newString);
  }

  static init(element, options = {}) {
    new Quiz(element, options);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-quiz').forEach(element => {
    Quiz.init(element);
  });
});

Window.Quiz = Quiz;
