;(function() {
  "use strict";

  var controller = require("BaseController");
  controller.init({
    siteName: "BBC Radio",
    play: "#play",
    pause: "#pause",
    mute: "#volume-mute",
    like: "#toggle-mystations > span",

    song: "p.title > a",
    artist: "p.artist > a",

    hidePlayer: true
  });
})();
