class ChatScroll extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-chat-scroll');
    this.scrollInstance = this.initScrollbar();
    this.onChangeViewPort();
    this.init();
  }

  initScrollbar() {
    return new PerfectScrollbar(this.$node, {
      minScrollbarLength: 66,
    });
  }


  destroyScrollbar() {
    this.scrollInstance.destroy();
    this.scrollInstance = null;
  }

  build() {
    this.initScrollbar();
  }

  onChangeViewPort() {
    if (window.matchMedia('(min-width: 1024)').matches) {
      this.initScrollbar();
    } else {

      this.destroyScrollbar();
      console.log('change');
    }
  }

  static init(elem) {
    new ChatScroll(elem);
  }
}

document.querySelectorAll('.js-chat-scroll').forEach((element) => {
  ChatScroll.init(element);
});

window.ChatScroll = ChatScroll;
