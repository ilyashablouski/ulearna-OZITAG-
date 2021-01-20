const Layout = {
  _listeners: [],
  _documentClickListeners: [],

  current: null,

  isMobileLayout: function() {
    return $(window).width() <= 767;
  },

  isTabletLayout: function() {
    return $(window).width() >= 767 && $(window).width() <= 1259;
  },

  isBigTabletLayout: function() {
    return $(window).width() >= 1024 && $(window).width() <= 1259;
  },

  isLaptopLayout: function() {
    return $(window).width() >= 1024;
  },

  isDesktopLayout: function() {
    return $(window).width() >= 1260;
  },

  addListener: function(func) {
    this._listeners.push(func);
  },

  getCurrentLayout() {
    if (this.isDesktopLayout()) {
      return 'DESKTOP';
    }
    if (this.isTabletLayout()) {
      return 'TABLET';
    }
    if (this.isMobileLayout()) {
      return 'MOBILE';
    }
  },

  _fireChangeMode: function() {
    const that = this;

    setTimeout(function() {
      for (let i = 0; i < that._listeners.length; i++) {
        that._listeners[i](that.is_mobile);
      }
    }, 0);
  },

  addDocumentClickHandler: function(handler) {
    this._documentClickListeners.push(handler);
  },

  fireDocumentClick: function(e) {
    this._documentClickListeners.forEach(function(handler) {
      handler(e);
    });
  },

  isTouchDevice: function() {
    return 'ontouchstart' in document.documentElement;
  },

  init: function() {
    this.current = this.getCurrentLayout();

    $(window).on('resize', function() {
      const layout = Layout.getCurrentLayout();
      if (layout !== Layout.current) {
        Layout.current = layout;
        Layout._fireChangeMode();
      }
    });

    let documentClick = false;
    $(document).on('touchstart', function() {
      documentClick = true;
    });
    $(document).on('touchmove', function() {
      documentClick = false;
    });
    $(document).on('click touchend', function(e) {
      if (e.type === 'click') {
        documentClick = true;
      }
      if (documentClick) {
        Layout.fireDocumentClick(e);
      }
    });
  },
};

Layout.init();

window.Layout = Layout;

window.isMobileLayout = function() {
  return Layout.isMobileLayout();
};

window.isTabletLayout = function() {
  return Layout.isTabletLayout();
};

window.isBigTabletLayout = function() {
  return Layout.isBigTabletLayout();
};

window.isLaptopLayout = function() {
  return Layout.isLaptopLayout();
};

window.isDesktopLayout = function() {
  return Layout.isDesktopLayout();
};
