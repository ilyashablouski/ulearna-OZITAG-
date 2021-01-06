class Chat extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-chat');
    this.$backButton = this.queryElement('.btn-arrow--back');
    this.$chatUsers = document.querySelectorAll('.chat-user');
    this.$chatWindow = this.queryElement('.chat__right');
    this.build();
  }

  openChat() {
    this.$chatWindow.classList.add('chat__right--opened');
  }

  closeChat() {
    this.$chatWindow.classList.remove('chat__right--opened')
  }

  build() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.$chatUsers.forEach(($node) => {
        $node.addEventListener('click', () => {
          this.openChat();
        });
      });

      this.$backButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeChat();
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

