var sw = require("selenium-webdriver"),
    path = require("path"),
    fs = require("fs"),
    chrome = require("selenium-webdriver/chrome");

var chromeOptions = new chrome.Options(),
    extPath = "--load-extension=" + path.resolve(path.join(path.dirname(fs.realpathSync(__filename)), "streamkeys-ext/"));
console.log("Extension load path: " + extPath);

chromeOptions.addArguments([extPath, "--log-level=0"]);
chromeOptions.setLoggingPrefs({browser: "ALL"});

/* globals */
global.expect = require("chai").expect;
global.shared = require("./musicsite.js");
global.helpers = require("./helpers.js");
global.test = require("selenium-webdriver/testing");

/* exports */
module.exports = {
  webdriver: sw,
  getDriver: function() { return chrome.createDriver(chromeOptions); },
  loadSite: function(driver, url, callback) {
    driver.get(url).then(function() { callback(); } );
  }
}
