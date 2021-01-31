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
      const isQuestionBtn = clickedElement.closest('.js-quiz__add-question');
      const isResponseBtn = clickedElement.closest('.js-quiz__add-response');
      console.log('Toggle btn:' + toggleBtn + '\r\n',
        'Question btn:' + isQuestionBtn + '\r\n',
        'Response btn:' + isResponseBtn + '\r\n');

      if (toggleBtn) {
        this.onToggleChecked(toggleBtn);
      } else if (isQuestionBtn) {
        this.addQuestion();
      } else if (isResponseBtn) {
        this.addResponse();
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
    const cloneQuizElement = this.$defaultQuizElement.cloneNode(true);
    this.$defaultQuizElement.parentElement.append(cloneQuizElement);
    console.log(cloneQuizElement);
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
