class CustomScroll extends Widget {
  constructor(nodeElement) {
    super(nodeElement, '.js-custom-scroll');
    this.init();
  }


  build() {
    SmoothScrollbar.init((this.$node),
      {
        alwaysShowTracks: true,
        thumbMinSize: 66,
      });
  }

  destroy() {
    SmoothScrollbar.destroy(this.$node);
  }

  static init(element) {
    new CustomScroll(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-custom-scroll').forEach((element) => {
    CustomScroll.init(element);
  });
});

window.CustomScroll = CustomScroll;
