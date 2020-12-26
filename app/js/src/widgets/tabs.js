// class Tabs {
//   constructor(nodeElement) {
//     this.nodeElement = nodeElement;
//     this.activeTab = null;
//     this.tabs = [];
//
//     this.initTabs();
//
//     if (this.tabs.length > 0) {
//       this.init();
//     }
//   }
//
//   initTabs() {
//     this.findTabs().forEach(tabItem => {
//       const targetSelector = tabItem.dataset.target;
//       if (!targetSelector) {
//         console.error(`Tab "${tabItem.innerText}" does not have data-target attribute`);
//         return;
//       }
//
//       const tabContent = this.nodeElement.querySelector(targetSelector);
//       if (!tabContent) {
//         console.error(`Tab content with selector "${targetSelector}" not found`);
//       }
//
//       const isActive = this.activeTab === null && tabItem.classList.contains('active');
//
//       const tabModel = {
//         isActive: isActive,
//         tabElement: tabItem,
//         tabContentElement: tabContent
//       };
//
//       if (isActive) {
//         this.activeTab = tabModel;
//       }
//
//       this.tabs.push(tabModel);
//     });
//   }
//
//   findTabs() {
//     const result = [];
//
//     this.nodeElement.querySelectorAll('.js-tab').forEach(item => {
//       if (item.closest('.js-tabs') === this.nodeElement) {
//         result.push(item);
//       }
//     });
//
//     return result;
//   }
//
//   hideTab(model) {
//     model.tabElement.classList.remove('active');
//
//     if (model.tabContentElement) {
//       model.tabContentElement.classList.remove('active');
//     }
//
//     model.isActive = false;
//   }
//
//   showTab(model) {
//     model.tabElement.classList.add('active');
//
//     if (model.tabContentElement) {
//       model.tabContentElement.classList.add('active');
//     }
//
//     model.isActive = true;
//   }
//
//   setActiveTab(model) {
//     if (!model.isActive) {
//       this.tabs.forEach(this.hideTab);
//     }
//
//     this.showTab(model);
//   }
//
//   onTabClick(e, model) {
//     e.preventDefault();
//
//     this.setActiveTab(model);
//   }
//
//   setDefaults() {
//     if (!this.activeTab) {
//       this.setActiveTab(this.tabs[0]);
//     } else {
//       this.setActiveTab(this.activeTab);
//     }
//   }
//
//   init() {
//     this.setDefaults();
//
//     this.tabs.forEach(tabModel => {
//       tabModel.tabElement.addEventListener('click', e => this.onTabClick(e, tabModel));
//     });
//   }
// }
//
// class TabsUI {
//   static init() {
//     document.querySelectorAll('.js-tabs').forEach(element => new Tabs(element));
//   }
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//   TabsUI.init();
// });
// window.TabsUI = TabsUI;

class Tabs{
  constructor(){
    this.tabList = document.querySelectorAll('.js-tab');
    this.contentList = document.querySelectorAll('.js-tab-content');
    let rootContainer= document.querySelector('.js-tabs');

    rootContainer.addEventListener('click', e => this.show(e));

    this.setIndex();
  }

  show(e){
    let t = e.target;
    if (!t.classList.contains('js-tab')) return;
    this.removePrev();

    let index = t.getAttribute('data-index');
    let content = document.querySelector('.js-tab-content[data-index="'+index+'"]');

    t.classList.add('active');
    content.classList.add('active');
  }

  setIndex(){
    for (let i = 0; i < this.tabList.length; i++){
      this.tabList[i].setAttribute('data-index', i);
      this.contentList[i].setAttribute('data-index', i);
    }
  }

  removePrev(){
    for (let i = 0; i < this.tabList.length; i++){
      this.tabList[i].classList.remove('active');
      this.contentList[i].classList.remove('active');
    }
  }

}

document.addEventListener('DOMContentLoaded', ()=>{
  let tabs = new Tabs();
})

