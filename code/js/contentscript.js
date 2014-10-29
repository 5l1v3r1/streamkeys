;(function() {
  "use strict";
  chrome.runtime.sendMessage({action: "get_site_controller", url: window.location.host}, function(controller) {
    console.log("RESP: ", controller);

    if(controller) {
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", chrome.extension.getURL("js/controllers/" + controller));
      (document.head || document.documentElement).appendChild(script);
    }
    console.log("injected");
  });
})();
