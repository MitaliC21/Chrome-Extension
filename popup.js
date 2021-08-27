let sPage = document.querySelector('#start');
let ePage = document.querySelector('#end');
const button = document.getElementById('button');


function goToUrl(tab, url) {
  chrome.tabs.update(tab.id, { url });
  return new Promise((resolve) => {
    chrome.tabs.onUpdated.addListener(function onUpdated(tabId, info) {
      console.log(info.status);
      if (info.status === "complete") {
        chrome.tabs.onUpdated.removeListener(onUpdated);
        resolve();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  button.addEventListener("click", async (e)=> {
    e.preventDefault();

    let pageStart = sPage.value;
    let pageEnd = ePage.value;
   console.log(pageStart)
   console.log(pageEnd)
    chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
      var activeTab = tabs[0];
      var count = pageEnd=pageStart;
     for(count; count >= 0; count--){
       await goToUrl(activeTab.id, `https://www.linkedin.com/search/results/people/?keywords=data%20science&origin=SWITCH_SEARCH_VERTICAL&page=${++pageStart}&sid=uf%2C`)

       chrome.tabs.sendMessage(activeTab.id, {"data": 'pass'});
       console.log("solved")
        }
        chrome.tabs.sendMessage(activeTab.id, {"msg": 'alert'});
    });
});
});
