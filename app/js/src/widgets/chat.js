//TODO: Refactoring code (смотреть uikit-accord. widget)
class Chat extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-chat');
    this.$backButton = this.queryElement('.btn-arrow--back');
    this.$chatUsers = document.querySelectorAll('.chat-user');
    this.$chatWindow = this.queryElement('.chat__right');
    this.build();
  }

  build() {
    if (window.matchMedia('(max-width: 767px)').matches) {

      this.$chatUsers.forEach(($node) => {
        $node.addEventListener('click', () => {
          this.$chatWindow.classList.add('chat__right--opened');
        });
      });

      this.$backButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.$chatWindow.classList.remove('chat__right--opened');
      });
    }
  }

  static init(elem) {
    return new Chat(elem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-chat').forEach((element) => {
    Chat.init(element);
  });
});

window.Chat = Chat;

