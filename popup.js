let sPage = document.querySelector('#start');
let ePage = document.querySelector('#end');
const button = document.getElementById('button');
let finalArr = [];
let profile = [];

function goToUrl(tab, url) {
  chrome.tabs.update(tab.id, { url });
  return new Promise((resolve) => {
    chrome.tabs.onUpdated.addListener(function onUpdated(tabId, info) {
      if (info.status === "complete") {
        chrome.tabs.onUpdated.removeListener(onUpdated);
        resolve();
      }
    });
  });
}

function goToLinks(tab){
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tab, {"data": 'pass'}, async function(response){
      finalArr.push(response.information);
      console.log(response);
      for(let i=0;i<10;i++){
        await goToUrl(tab, response.arr[i])
        chrome.tabs.sendMessage(tab, {"about": 'about'}, function(res){
          profile.push(res);
        });
      }
      
      resolve();
      });
  })
}

document.addEventListener("DOMContentLoaded", function() {
  button.addEventListener("click", async (e)=> {
    e.preventDefault();
    button.disabled=true;
    let pageStart = sPage.value;
    let pageEnd = ePage.value;
    chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
      var activeTab = tabs[0];
      var count = pageEnd-pageStart;
      await goToUrl(activeTab.id, `https://www.linkedin.com/search/results/people/?keywords=data%20science&origin=SWITCH_SEARCH_VERTICAL&page=${pageStart}&sid=uf%2C`)
     
     for(count; count >= 0; count--){
      await goToLinks(activeTab.id);
      
      await goToUrl(activeTab.id, `https://www.linkedin.com/search/results/people/?keywords=data%20science&origin=SWITCH_SEARCH_VERTICAL&page=${++pageStart}&sid=uf%2C`)
       
      }
       
      chrome.tabs.sendMessage(activeTab.id, {"msg": 'alert', "result": finalArr, "pInfo": profile});
         
    });
});
});
