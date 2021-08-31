let arr = [];
let information = [];

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(request, sender, sendResponse){
  if(request.data === "pass"){
    let p = document.querySelectorAll("[dir = 'ltr']");
    
    for(let i=1;i<= 10;i++){
        console.log(p[i].firstChild.innerText)
        arr.push(p[i].parentElement.href)
        information.push(p[i].firstChild.innerText)
      }
      sendResponse({arr, information});
   }
  
   if(request.about === 'about'){
     sendResponse(content());
   }
  
   if(request.msg === "alert"){
     console.clear()
     for(const page of request.result){
       for(let i=0; i<10; i++){
         console.log(page[i]);
       }
     }
     console.log("**********Information stored in array data structure**********")
     console.log(request.pInfo)
     console.log("**********Expanded view of information**********")
     for(const inf of request.pInfo ){
      console.log(inf);
     }
   
     alert("Done");
     
   }
}


function content(){
  let profile = {}
  profile.name = document.querySelector('.text-heading-xlarge').innerText;

  if(document.querySelector('.pv-about-section')){
  profile.about = document.querySelector('.pv-about-section').innerText;
  }
  else{console.log("Information not available")}

  profile.connections = document.querySelector('.t-bold').innerText;

 if(document.querySelectorAll('#experience-section')){
  profile.experience = [];
  let info = document.querySelectorAll('.pv-entity__secondary-title.separator');
  for(let e of info ){
    profile.experience.push(e.parentElement.innerText);
  }
  }
  else{console.log("Information not available")}
  console.log(profile);
  return profile;
 }

  
