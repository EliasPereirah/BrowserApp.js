let code = localStorage.getItem('code');
let selected = localStorage.getItem('selected');

if(code != null){
    if(selected !=='sites'){
        eval(code);
    }
}

function insertCode(code, intervalo, selected){
    localStorage.setItem('code', code);
    localStorage.setItem('selected', selected);
    localStorage.setItem('intervalo', intervalo);
    if(selected !=='sites'){
        eval(code);
    }
}




function notify(title, msg, url, duration = 60000){
    data = {
        type: 'notification',
        options: {
            title: title,
            message: msg,
            iconUrl: 'common/ui/icons/icon32.png',
            type: 'basic'
        }};
    chrome.notifications.create('', data.options,function(notificationId) {
        setTimeout(function(){
            chrome.notifications.clear(notificationId, function(){});
        }, 60000);
    });
    chrome.notifications.onClicked.addListener(function(notificationId, byUser) {
        window.open(url,"blank");
    });
}



chrome.browserAction.onClicked.addListener(function () {
    var optionsUrl = chrome.extension.getURL('code.html');
    chrome.tabs.query({url: optionsUrl}, function (tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, {active: true});
        } else {
            chrome.tabs.create({url: optionsUrl + "#BrowserApp.js"});
        }
    });

});




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-code') {
            let code = localStorage.getItem('code');
           let selected = localStorage.getItem('selected');
           console.log('sl: '+selected);
            if(code != null && selected !== 'background'){
                let intervalo = localStorage.getItem('intervalo');
                //alert(intervalo);
                intervalo = parseInt(intervalo);
                if(intervalo > 0){
                    //alert('doing interval');
                    sendResponse(code);
                    setInterval(()=>{
                        sendResponse(code);
                    },intervalo);

                }else{
                   //alert('interval is null or zero');
                }
            }else{
               //alert('code is null');
            }


    }else{
       // alert('no msg '+message)
    }
    return  true; // that is important

});