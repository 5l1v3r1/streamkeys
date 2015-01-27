;(function() {
  "use strict";

  require("BaseController").init({
    siteName: "Yandex",
    playPause: ".player-controls__btn_play",
    playNext: ".player-controls__btn_next",
    playPrev: ".player-controls__btn_prev",
    mute: ".volume__icon",
    like: ".player-controls .icon_like",
    dislike: ".player-controls .icon_like_on",

    song: ".track__title",
    artist: ".track__artists"
  });
})();
