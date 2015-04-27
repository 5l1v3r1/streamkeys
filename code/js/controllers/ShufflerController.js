;(function() {
  "use strict";

  require("BaseController").init({
    siteName: "Shuffler.fm",
    playPause: "#play-pause",
    playNext: "#next",
    playPrev: "#prev",

    playState: ".pause",
    song: ".track-title",
    artist: ".artist-name"
  });
})();
