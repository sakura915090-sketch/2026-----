$(".slider").slick({
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  dots: false,
  centerMode: true,
  centerPadding: "20%",
});

$(function () {
  $("#idCarousel").CloudCarousel({
    xPos: 200,
    yPos: 100,
    bringToFront: true, //クリック画像を前に移動
    mouseWheel: true, //マウスホイール回転
    autoRotate: false, //自動回転
    autoRotateDelay: 1000, //回転速度
  });
});

const tabs = document.querySelectorAll(".js-tab");
function tabSwitch() {
  let tabsArray = Array.prototype.slice.call(tabs);
  let index = tabsArray.indexOf(this);
  const resetTab = function () {
    document.querySelector(".js-tab.-active").classList.remove("-active");
    document
      .querySelector(".js-tab[aria-selected=true]")
      .removeAttribute("aria-selected");
    document.querySelectorAll(".js-tab").forEach((elm) => {
      elm.tabIndex = -1;
    });
    document.querySelector(".js-tab-panel.-active").classList.remove("-active");
  };
  const setTab = function (tab, tabpanel) {
    tab.classList.add("-active");
    tab.tabIndex = 0;
    tab.setAttribute("aria-selected", true);
    tabpanel.classList.add("-active");
  };
  if (event.type == "keyup") {
    if (event.key === "ArrowRight") {
      if (tabsArray[index + 1]) {
        tabsArray[index + 1].focus();
        resetTab();
        setTab(
          tabsArray[index + 1],
          document.querySelectorAll(".js-tab-panel")[index + 1],
        );
      } else {
        tabsArray[0].focus();
        resetTab();
        setTab(tabsArray[0], document.querySelectorAll(".js-tab-panel")[0]);
      }
    }
    if (event.key === "ArrowLeft") {
      if (tabsArray[index - 1]) {
        tabsArray[index - 1].focus();
        resetTab();
        setTab(
          tabsArray[index - 1],
          document.querySelectorAll(".js-tab-panel")[index - 1],
        );
      } else {
        let lastTab = tabsArray.pop();
        lastTab.focus();
        resetTab();
        setTab(
          lastTab,
          Array.prototype.slice
            .call(document.querySelectorAll(".js-tab-panel"))
            .pop(),
        );
      }
    }
  }
  if (event.type == "click") {
    resetTab();
    setTab(this, document.querySelectorAll(".js-tab-panel")[index]);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", tabSwitch);
  tab.addEventListener("keyup", tabSwitch);
});

// ------------
const tab2List = document.querySelector(".tab2-list");

const tab2Tabs = [...tab2List.querySelectorAll('[role="tab"]')];

const tab2Panels = [...document.querySelectorAll(".tab2-panel")];

function activateTab2(tab2Target) {
  // タブをすべて非選択
  tab2Tabs.forEach((tab2Item) => {
    tab2Item.setAttribute("aria-selected", "false");

    tab2Item.setAttribute("tabindex", "-1");
  });

  // パネルをすべて非表示
  tab2Panels.forEach((tab2Panel) => {
    tab2Panel.hidden = true;
  });

  // 選択されたタブ
  tab2Target.setAttribute("aria-selected", "true");

  tab2Target.setAttribute("tabindex", "0");

  // 対応するパネル
  const tab2PanelId = tab2Target.getAttribute("aria-controls");

  const tab2Panel = document.getElementById(tab2PanelId);

  tab2Panel.hidden = false;
}

/* ==============================
   クリック
================================ */

tab2Tabs.forEach((tab2Tab) => {
  tab2Tab.addEventListener("click", () => {
    activateTab2(tab2Tab);
  });
});

/* ==============================
   キーボード
================================ */

tab2List.addEventListener("keydown", (event) => {
  const tab2CurrentIndex = tab2Tabs.indexOf(document.activeElement);

  if (tab2CurrentIndex === -1) {
    return;
  }

  let tab2NextIndex = tab2CurrentIndex;

  switch (event.key) {
    case "ArrowDown":
      tab2NextIndex = (tab2CurrentIndex + 1) % tab2Tabs.length;

      break;

    case "ArrowUp":
      tab2NextIndex =
        (tab2CurrentIndex - 1 + tab2Tabs.length) % tab2Tabs.length;

      break;

    case "Home":
      tab2NextIndex = 0;

      break;

    case "End":
      tab2NextIndex = tab2Tabs.length - 1;

      break;

    default:
      return;
  }

  event.preventDefault();

  const tab2NextTab = tab2Tabs[tab2NextIndex];

  tab2NextTab.focus();

  activateTab2(tab2NextTab);
});
