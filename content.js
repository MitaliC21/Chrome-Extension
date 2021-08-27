chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(request, sender, sendResponse){
  if(request.data === "pass"){
    let p = document.querySelectorAll("[dir = 'ltr']");
    for(let i=1;i<p.length;i++){
        console.log(p[i].innerText)
    }
   }
}


 
        

  
