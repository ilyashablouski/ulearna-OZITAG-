const locale = {
  searchPlaceholder: 'Search...',
  notFoundMessage: 'Not Found',
};

class Select extends Widget {
  constructor(node) {
    super(node, 'js-select');

    this.onChange = this.onChange.bind(this);

    this.withSearch = !!this.$node.dataset.search;
    this.placeholder = this.$node.dataset.placeholder;

    this.hasInitialValue = ($(this.$node).find('option[selected]').length > 0 && $(this.$node).find('option[selected]').text() !== '') || (!this.placeholder && $(this.$node).find('option').length > 0 && ($(this.$node).find('option').first().text() !== ''));

    this.init();
  }


  onChange(e) {
    if (e.target.value) {
      this.setAsSelected();
    } else {
      this.setAsNotSelected();
    }
  }

  initSelect2() {
    const withSearch = this.withSearch;

    $(this.$node).select2({
      minimumResultsForSearch: -1,
      placeholder: this.hasInitialValue ? this.placeholder : null,
      'language': {
        'noResults': locale.notFoundMessage,
      },
    }).on('select2:open', function() {
      if (withSearch) {
        $('.select2-dropdown').get(0).classList.add('select2-with-search');
      }
      const width = parseInt($('.select2-dropdown').get(0).style.width);
      $('.select2-dropdown').css('min-width', (width + 1) + 'px');
      new PerfectScrollbar($('.select2-results__options').get(0), {
        minScrollbarLength: 20,
      });

      $(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', locale.searchPlaceholder);
    });

    if (withSearch === false) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(this.$node).select2('destroy');
        $(this.$node).removeClass('visually-hidden');
      }
    }

    $(this.$node).on('change', this.onChange);

    if (this.hasInitialValue) {
      this.setAsSelected();
    } else {
      this.setAsNotSelected();
    }
  }

  build() {
    if (this.placeholder && this.hasInitialValue === false) {
      $(this.$node).prepend('<option selected></option>');
    }

    this.initSelect2();
  }

  setAsSelected() {
    this.$node.classList.add('selected');
  }

  setAsNotSelected() {
    this.$node.classList.remove('selected');
  }

  static init(el) {
    new Select(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-select').forEach(item => Select.init(item));
});
