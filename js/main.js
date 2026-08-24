$(".slider").slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    centerMode: true,
    centerPadding: '20%',
}
);

const tabs = document.querySelectorAll('.js-tab')
function tabSwitch(){
  let tabsArray = Array.prototype.slice.call(tabs);
  let index = tabsArray.indexOf(this);
  const resetTab = function(){
    document.querySelector('.js-tab.-active').classList.remove('-active');
    document.querySelector('.js-tab[aria-selected=true]').removeAttribute('aria-selected');
    document.querySelectorAll('.js-tab').forEach((elm)=>{
      elm.tabIndex = -1;
    });
    document.querySelector('.js-tab-panel.-active').classList.remove('-active');
  }
  const setTab = function(tab,tabpanel) {
    tab.classList.add('-active');
    tab.tabIndex = 0;
    tab.setAttribute('aria-selected',true);
    tabpanel.classList.add('-active');
  }
  if (event.type == 'keyup') {
    if(event.key === 'ArrowRight') {
      if(tabsArray[index + 1]) {
        tabsArray[index + 1].focus();
        resetTab();
        setTab(tabsArray[index + 1],document.querySelectorAll('.js-tab-panel')[index + 1]);
        } else {
         tabsArray[0].focus();
         resetTab();
         setTab(tabsArray[0], document.querySelectorAll('.js-tab-panel')[0]);
        };
      };
    if(event.key === 'ArrowLeft') {
      if(tabsArray[index - 1]) {
         tabsArray[index - 1].focus();
         resetTab();
         setTab(tabsArray[index - 1], document.querySelectorAll('.js-tab-panel')[index - 1])
        } else {
         let lastTab =  tabsArray.pop();
         lastTab.focus();
         resetTab();
         setTab(lastTab, Array.prototype.slice.call(document.querySelectorAll('.js-tab-panel')).pop());
        };
      };
  }
  if (event.type == 'click')　{
    resetTab();
    setTab(this, document.querySelectorAll('.js-tab-panel')[index]);
  }
};

tabs.forEach((tab)=>{
  tab.addEventListener('click',tabSwitch);
  tab.addEventListener('keyup',tabSwitch);
});
