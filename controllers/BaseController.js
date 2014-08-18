function sk_log(msg, obj, err) {
  obj = obj || "";
  if(err) { console.error("STREAMKEYS-ERROR: " + msg, obj); }
  else { console.log("STREAMKEYS-INFO: " + msg, obj); }
};

var BaseController = function() {
  this.name = document.location.hostname;
};

BaseController.prototype.init = function(options) {

  //** Inject console log formatter **//
  this.injectScript({script: sk_log});

  //** Properties **//
  this.selector_playPause = options.playPause || null;
  this.selector_play = options.play || null;
  this.selector_pause = options.pause || null;
  this.selector_playNext = options.playNext || null;
  this.selector_playPrev = options.playPrev || null;
  this.selector_mute = options.mute || null;
  this.selector_iframe = options.iframe || null;

  //Optional. Style of play and pause buttons when they are NOT in use
  //EX: When a play button is in use, css class "playing" is added
  //In that case, set play_style to "playing"
  this.play_style = options.playStyle || null;
  this.pause_style = options.pauseStyle || null;

  this.iframe = (typeof options.iframe === "string");

  //Default listener sends actions to main document
  if(this.iframe) {
    this.attachFrameListener();
  } else {
    this.attachListener();
  }

  chrome.runtime.sendMessage({created: true}, function(response){
    sk_log("Told BG we are created");
  });

  sk_log("SK content script loaded");
};

BaseController.prototype.injectScript = function(file) {
  var script = document.createElement("script");
  script.setAttribute('type', 'text/javascript');
  if(file.url) {script.setAttribute('src', chrome.extension.getURL(file.url));}
  if(file.script) {script.innerHTML = file.script;}
  (document.head||document.documentElement).appendChild(script);
};

BaseController.prototype.isPlaying = function() {
  var elem = document.querySelector(this.selector_play);
  var displayStyle = "none";
  var isPlaying = false;

  //Check for play/pause style overrides
  if(this.play_style && this.pause_style) {
    //Check if the class list contains the class that is only active when play button is playing
    isPlaying = elem.classList.contains(this.play_style);
  } else {
    //hack to get around sometimes not being able to read css properties that are not inline
    if (elem.currentStyle) {
      displayStyle = elem.currentStyle.display;
    } else if (window.getComputedStyle) {
      displayStyle = window.getComputedStyle(elem, null).getPropertyValue("display");
    }
    isPlaying = (displayStyle == "none");
  }

  sk_log("IsPlaying: " + isPlaying);
  return isPlaying;
};

//** Click inside document **//
BaseController.prototype.click = function(selectorButton, action) {
  var ele = document.querySelector(selectorButton)
  try {
    ele.click();
    sk_log(action);
  } catch(e) {
    sk_log("Element not found for click.", selectorButton, true);
  }
};

//** Click inside an iframe **//
BaseController.prototype.clickInFrame = function(selectorFrame, selectorButton, action) {
  var doc = document.querySelector(selectorFrame).contentWindow.document;
  if (!doc) return null;

  try {
    doc.querySelector(selectorButton).click();
    sk_log(action);
  } catch(e) {
    sk_log("Element not found for click.", selectorButton, true);
  }
};

//TODO: make isPlaying work with iframes
BaseController.prototype.playPause = function() {
  if(this.selector_play !== null && this.selector_pause !== null) {
    if(this.isPlaying()) {
      this.click(this.selector_pause, "playPause");
    } else {
      this.click(this.selector_play, "playPause");
    }
  } else {
    if(this.iframe) this.clickInFrame(this.selector_iframe, this.selector_playPause, "playPause");
    else            this.click(this.selector_playPause, "playPause");
  }
};

BaseController.prototype.playNext = function() {
  if(this.selector_playNext) {
    if(this.iframe) this.clickInFrame(this.selector_iframe, this.selector_playNext, "playNext");
    else            this.click(this.selector_playNext, "playNext");
  }
};

BaseController.prototype.playPrev = function() {
  if(this.selector_playPrev) {
    if(this.iframe) this.clickInFrame(this.selector_iframe, this.selector_playPrev, "playPrev");
    else            this.click(this.selector_playPrev, "playPrev");
  }
};

BaseController.prototype.mute = function() {
  if(this.selector_mute) {
    if(this.iframe) this.clickInFrame(this.selector_iframe, this.selector_mute, "mute");
    else            this.click(this.selector_mute, "mute");
  }
};

BaseController.prototype.doRequest = function(request, sender, sendResponse) {
  if(typeof request !== "undefined") {
    if(request.action == "play_pause") this.playPause();
    if(request.action == "play_next") this.playNext();
    if(request.action == "play_prev") this.playPrev();
    if(request.action == "mute") this.mute();
  }
};

BaseController.prototype.attachListener = function() {
  chrome.runtime.onMessage.addListener(this.doRequest.bind(this));
  sk_log("Attached listener for ", this);
};

BaseController.prototype.attachFrameListener = function() {
  chrome.runtime.onMessage.addListener(this.doRequest.bind(this));
  sk_log("Attached frame listener for ", this);
};

