const tabItemSelector = '.js-tab';
const contentItemSelector = '.js-content';

const activeTabHeaderClass = 'active';
const activeTabContentClass = 'active';

class TabsWidget extends Widget{
  constructor(nodeElement){
    super(nodeElement, '.js-tabsWidget')
    this.tabs = [];
    this.activeTab = null;

    this.initFromHtml(nodeElement);
    this.activateTab(this.tabs[0]);
  }

  initFromHtml (nodeElement) {
    const headers  = nodeElement.querySelectorAll(tabItemSelector);
    const contents = nodeElement.querySelectorAll(contentItemSelector);

    for (let i = 0; i < headers.length; i++) {
      this.registerTab(headers[i], contents[i]);
    }
  }

  registerTab (header, content) {
    const tab = new TabItem(header, content);
    tab.onActivate(() => this.activateTab(tab));
    this.tabs.push(tab);
  }

  activateTab (tabItem) {
    if (this.activeTab) {
      this.activeTab.setActive(false);
    }

    this.activeTab = tabItem;
    this.activeTab.setActive(true);
  }

  static init(elem) {
    return new TabsWidget(elem)
  }
}

class TabItem {
  constructor (header, content) {
    this.header  = header;
    this.content = content;
  }
  onActivate (action) {
    this.header.addEventListener('click', () => action(this));
  }
  setActive(value) {
    this.header.classList.toggle(activeTabHeaderClass, value);
    this.content.classList.toggle(activeTabContentClass, value);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.js-tabsWidget').forEach((element) => {
    TabsWidget.init(element);
  });
});

window.TabsWidget = TabsWidget;
