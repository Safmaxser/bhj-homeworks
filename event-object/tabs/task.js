function initializingTabs(tabs) {
  const tabList = tabs.querySelectorAll('.tab');
  const tabContentList = tabs.querySelectorAll('.tab__content');

  tabList.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabList.forEach(item => item.classList.remove('tab_active'));
      tab.classList.add('tab_active');
      tabContentList.forEach(item => item.classList.remove('tab__content_active'));
      tabContentList[index].classList.add('tab__content_active');
    });
  });
};

const tabs1 = document.getElementById('tabs1');
initializingTabs(tabs1);