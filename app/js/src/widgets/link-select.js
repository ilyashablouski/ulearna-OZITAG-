class LinkSelect {
  constructor(node, options) {
    this.$el = node;
    this.options = options;
    this.selectedId = options.selectedId;
    this.parent = this.$el.parentNode;
    this.$nodeElement = null;
    this.$backdrop = null;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;

    if (this.parent.querySelectorAll('.select')) {
      this.parent.querySelectorAll('.select').forEach(item => item.remove());
    }

    this.buildHTMLTemplate();
    this.$nodeElement.insertAdjacentHTML('beforeend', this.getTemplate(data, placeholder, this.selectedId));

    this.generateBackdropHtml();
    this.$backdrop = document.querySelector('.select-backdrop');
    this.$backdrop.addEventListener('click', () => this.close());
    this.$backdrop.setAttribute('data-init', 'true');
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$nodeElement.addEventListener('click', this.clickHandler, false);
    this.$value = this.$nodeElement.querySelector('[data-type="value"]');
  }

  getTemplate(data = [], placeholder, selectedId) {
    let text = placeholder ?? 'Placeholder по умолчанию';

    const items = data.map(item => {
      let cls = '';
      if (item.id === selectedId) {
        text = item.displayLabel && Layout.isMobileLayout() === false ? item.displayLabel : item.value;
        cls = 'select__item--selected';
      }

      return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`;
    });

    return `
      <div class="select__input" data-type="input">
        <span data-type="value">${text}</span>
      </div>
      <div class="select__dropdown">
      <div class="select__backdrop" data-type="backdrop"></div>
        <ul class="select__list">
          ${items.join('')}
        </ul>
      </div>
    `;
  }

  renderDestroyedTemplate(data = [], selectedId) {
    const items = data.map(item => {
      let cls = '';
      if (item.id === selectedId) cls = 'select-list__link--selected';
      return `<li class="select-list__item"><a class="select-list__link ${cls}" href="${item.link}">${item.value}</a></li>`;
    });

    return `<ul class="select-list">${items.join('')}</ul>`;
  }

  buildHTMLTemplate() {
    this.$nodeElement = document.createElement('div');
    this.$nodeElement.classList.add('select');

    this.parent.insertAdjacentElement('beforeend', this.$nodeElement);
  }

  generateBackdropHtml() {
    if (document.querySelector('.select-backdrop')) return null;

    document.body.insertAdjacentHTML('beforeend', `
    <div class="select-backdrop" data-type="backdrop"></div>
    `);
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    switch (type) {
      case 'input':
        this.toggle();
        break;
      case 'value':
        this.toggle();
        break;
      case 'arrow':
        this.toggle();
        break;
      case 'item':
        const id = event.target.dataset.id;
        this.select(id);
        break;
      case 'link':
        const idLink = event.target.dataset.id;
        this.select(idLink);
        break;
      case 'backdrop':
        this.close();
        break;
    }
  }

  get isOpen() {
    return this.$nodeElement.classList.contains('select--open');
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  }

  select(id) {
    if (id === this.selectedId) {
      this.close();
      return;
    }

    this.selectedId = id;

    if (this.current && this.current.link) {
      if (document.location.href === this.current.link) {
        window.location.reload();
      } else {
        document.location.href = this.current.link;
      }
      return;
    }

    this.$value.textContent = this.current.displayLabel ? this.current.displayLabel : this.current.value;

    this.$nodeElement.querySelectorAll('[data-type="item"]').forEach(el => {
      el.classList.remove('select__item--selected');
    });
    this.$nodeElement.querySelector(`[data-id="${id}"]`).classList.add('select__item--selected');

    this.$nodeElement.classList.add('select--active');

    this.options.onSelect ? this.options.onSelect(this.current) : null;

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    if (this.$nodeElement.getBoundingClientRect().top + 200 > window.innerHeight) {
      this.$nodeElement.querySelector('.select__dropdown').classList.add('up');
    } else {
      this.$nodeElement.querySelector('.select__dropdown').classList.remove('up');
    }

    this.$nodeElement.classList.add('select--open');
    document.body.classList.add('select-opened');
  }

  close() {
    this.$nodeElement.classList.remove('select--open');
    this.$backdrop.classList.remove('select-backdrop--open');
    document.body.classList.remove('select-opened');
  }

  destroy() {
    const { data } = this.options;
    this.$nodeElement.removeEventListener('click', this.clickHandler);

    if (this.parent.querySelectorAll('.select')) {
      this.parent.querySelectorAll('.select').forEach(item => item.remove());
    }

    this.buildHTMLTemplate();
    this.$nodeElement.insertAdjacentHTML('beforeend', this.renderDestroyedTemplate(data, this.selectedId));
  }
}

class DefaultLinkSelect {
  constructor(node) {
    this.$node = node;
    this.$nodeItems = node.querySelectorAll('option');
    this.select = null;
    this.data = null;
    this.breakpoint = this.$node.dataset.breakpointValue || null;
    this.placeholder = this.$node.dataset.selectPlaceholder || null;

    this.events();
  }

  events() {
    this.updateCache();
    onResize(this.updateCache.bind(this));
  }

  get selectedID() {
    const data = [];

    this.$nodeItems.forEach((item, index) => {
      if (item.hasAttribute('selected')) data.push(`${this.$node.name || this.$node.id}-${index}`);
    });

    return data[0];
  }

  get configuredData() {
    const data = [];

    this.$nodeItems.forEach((item, index) => {
      const tempObj = {
        id: `${this.$node.name || this.$node.id}-${index}`,
        value: item.textContent,
        link: item.dataset.href ? item.dataset.href : null,
        displayLabel: item.dataset.displayLabel,
      };

      data.push(tempObj);
    });

    return data;
  }

  get checkSelectedID() {
    let selectId;

    this.selectedID === undefined || this.selectedID === null
      ? selectId = `${this.$node.name || this.$node.id}-0`
      : selectId = `${this.selectedID}`;
    return selectId;
  }

  initSelect() {
    // console.log(this.checkSelectedID);
    this.select = new LinkSelect(this.$node, {
      placeholder: this.placeholder ?? 'Выберите, пожалуйста, элемент',
      selectedId: this.checkSelectedID,
      data: this.configuredData,
    });
  }

  destroySelect() {
    this.select.destroy();
  }

  get checkBreakpoint() {
    switch (this.breakpoint) {
      case null:
        return true;
      case 'mobile':
        return isMobileLayout();
      case 'tablet':
        return isTabletLayout();
      case 'laptop':
        return isLaptopLayout();
      case 'desktop':
        return isDesktopLayout();
      default:
        return true;
    }
  }

  updateCache() {
    if (this.mayInit === this.checkBreakpoint) return null;
    this.mayInit = this.checkBreakpoint;
    this.initSelect();

    if (!this.mayInit) this.destroySelect();
  }

  static init(el) {
    new DefaultLinkSelect(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-link-select').forEach(item => DefaultLinkSelect.init(item));
});

window.DefaultLinkSelect = DefaultLinkSelect;
