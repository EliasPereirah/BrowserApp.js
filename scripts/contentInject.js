chrome.runtime.sendMessage('get-code', (response) => {
   eval(response);
});

