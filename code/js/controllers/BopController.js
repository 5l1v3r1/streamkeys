;(function() {
  "use strict";

  require("BaseController").init({
    siteName: "Bop.fm",
    playPause: "[data-action=play-pause]",
    playNext: "[data-action=next]",
    playPrev: "[data-action=previous]",
    like: "[data-action=toggle-favorite]",

    playState: "body.song-playing",
    song: "div.title > a",
    artist: "div.artist > a"
  });
})();
