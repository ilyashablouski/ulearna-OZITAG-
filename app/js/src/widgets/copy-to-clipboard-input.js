class CopyToClipboardInput {
  constructor(item) {
    this.btnElement = item;
    this.inputElement = item.parentElement.querySelector('input');
    this.message = document.querySelector('.js-copy-message');
    this.addEvents();
  }

  addEvents() {
    this.btnElement.addEventListener('click', () => {
      this.copyText(this.inputElement.value);
      this.setActive(this.message);

      setTimeout(() => this.removeActive(this.message), 800);
      return false;
    });
  }

  copyText(text) {
    const target = document.createElement('textarea');
    target.setAttribute('readonly', '');
    target.style.position = 'absolute';
    target.style.left = '-9999px';
    target.value = text;
    document.body.append(target);
    target.select();
    target.setSelectionRange(0, target.value.length);
    try {
      document.execCommand('copy');
      target.remove();
    } catch (e) {
    }
  }

  setActive(elem) {
    elem.classList.add('active');
  }

  removeActive(elem) {
    elem.classList.remove('active');
  }

  static init(elem) {
    new CopyToClipboardInput(elem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btnElement = document.querySelectorAll('.js-copy-to-clipboard-input');
  btnElement.forEach(item => {
    CopyToClipboardInput.init(item);
  });
});
