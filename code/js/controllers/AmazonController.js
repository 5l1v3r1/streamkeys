;(function() {
  "use strict";

  require("BaseController").init({
    playPause: "[playeraction='togglePlay']",
    playNext: "[playeraction='next']",
    playPrev: "[playeraction='previous']",
    mute: "#volumeIcon"
  });
})();
